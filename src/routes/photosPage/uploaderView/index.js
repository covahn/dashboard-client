import React, { useEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import { asyncImageCompressor } from 'utils/imageProcessing'

import { v4 as uuid } from 'uuid'

import { Button, Header, Title } from '../style'
import { Container, File, FileThumbnail, FileInfo, Bar } from './style'

import cx from 'utils/cx'

const fileObjectsReducer = (state, action) => {
  if (action.type === 'addFileObjects') {
    const byId = { ...state.byId, ...action.fileObjects }
    return { byId, allIds: Object.keys(byId) }
  }

  if (action.type === 'updateFileObjectUrl') {
    return {
      ...state,
      byId: {
        ...state.byId,
        [action.id]: {
          ...state.byId[action.id],
          objectURLs: {
            ...state.byId[action.id].objectURLs,
            ...action.changes,
          },
        },
      },
    }
  }

  return state
}

const loadedOfReducer = (state, action) => {
  if (action.type === 'setDenominator') {
    return [state[0], action.value]
  }
  if (action.type === 'increment') {
    return [state[0] + 1, state[1]]
  }
  return state
}

const UploaderView = React.memo(props => {
  const history = useHistory()

  const [loadedOf, dispatchLoadedOf] = useReducer(loadedOfReducer, [0, 0])
  const [fileObjects, dispatchFileObjects] = useReducer(fileObjectsReducer, {
    byId: {},
    allIds: [],
  })

  const handleInputChange = async e => {
    const files = e.target.files

    const newFileObjects = [...files].reduce((acc, file) => {
      const id = uuid()

      acc[id] = {
        name: file.name,
        id,
        objectURLs: {
          original: URL.createObjectURL(file),
          thumbnail: null,
          webView: null,
        },
      }

      return acc
    }, {})

    // dispatch
    dispatchFileObjects({ type: 'addFileObjects', fileObjects: newFileObjects })
    dispatchLoadedOf({
      type: 'setDenominator',
      value: Object.values(newFileObjects).length,
    })

    /**
     * start async compression promise chain
     * wait for all files to be compressed and given an objectURL
     */
    await Promise.all(
      Object.values(newFileObjects).map(async file => {
        const blob = await fetch(file.objectURLs.original).then(r => r.blob())

        const thumbnailObjectURL = URL.createObjectURL(
          await asyncImageCompressor(blob, {
            quality: 0.3,
            maxHeight: 200,
            maxWidth: 200,
          })
        )

        dispatchFileObjects({
          type: 'updateFileObjectUrl',
          id: file.id,
          changes: { thumbnail: thumbnailObjectURL },
        })

        const webViewObjectURL = URL.createObjectURL(
          await asyncImageCompressor(blob, {
            quality: 0.7,
            maxHeight: 1200,
            maxWidth: 1200,
          })
        )

        dispatchFileObjects({
          type: 'updateFileObjectUrl',
          id: file.id,
          changes: { webView: webViewObjectURL },
        })

        dispatchLoadedOf({
          type: 'increment',
        })
      })
    )

    // compression finished
  }

  useEffect(() => {
    console.log(fileObjects)
  }, [fileObjects])

  return (
    <Container>
      <Header>
        <Title>Upload</Title>
        <Button onClick={() => history.push('/photos')}>x</Button>
      </Header>
      <div>
        <input
          onChange={handleInputChange}
          type='file'
          id='img'
          name='img'
          accept='image/*'
          multiple
        />
      </div>
      <div>
        <Bar style={{ width: `${(100 / loadedOf[1]) * loadedOf[0]}%` }}></Bar>
        {fileObjects.allIds.map(id => {
          const fileObject = fileObjects.byId[id]

          return (
            <File>
              <FileInfo>{fileObject.name}</FileInfo>
              <FileThumbnail
                className={cx({
                  loaded: !!fileObject.objectURLs.webView,
                })}
                width='100%'
                src={
                  fileObject.objectURLs.original ||
                  fileObject.objectURLs.thumbnail
                }
              />
            </File>
          )
        })}
      </div>
    </Container>
  )
})

export default UploaderView
