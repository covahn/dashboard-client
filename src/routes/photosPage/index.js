import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { Switch, useHistory, useRouteMatch } from 'react-router-dom'

import { setDarkTheme } from 'store/reducers/meta'

import png6 from 'static/imgs/6.jpeg'
import png1 from 'static/imgs/1.jpeg'
import png4 from 'static/imgs/4.jpeg'
import png7 from 'static/imgs/7.jpeg'
import png5 from 'static/imgs/5.jpeg'
import png8 from 'static/imgs/8.jpeg'

import {
  Selector,
  SelectStatusContainer,
  Grid,
  Element,
  Img,
  Center,
  Container,
  Header,
  Side,
  Button,
  Title,
} from './style'

import PhotoView from './photoView'
import { Route } from 'react-router-dom'
import UploaderView from './uploaderView'
import { useHotkeys } from 'react-hotkeys-hook'
import cx from 'utils/cx'

const dbImages = [
  png6,
  png1,
  png4,
  png7,
  png5,
  png8,
  png6,
  png1,
  png4,
  png7,
  png5,
  png8,
  png6,
  png1,
  png4,
  png7,
  png5,
  png8,
  png6,
  png1,
  png5,
  png8,
  png6,
  png1,
  png5,
  png8,
  png6,
  png1,
  png6,
  png1,
  png4,
  png7,
  png5,
  png8,
  png6,
  png1,
  png4,
  png7,
  png5,
  png8,
  png6,
  png1,
  png4,
]

const useOutsideClick = (ref, handler) => {
  const eventHandler = e => {
    const contained = ref.current.contains(e.target)
    handler(!contained, e)
  }

  useEffect(() => {
    window.addEventListener('mousedown', eventHandler)

    return () => window.removeEventListener('mousedown', eventHandler)
  }, [])
}

const Photo = props => {
  const selectIfUnselected = () =>
    props.isSelected ? props.unselect() : props.select()

  const handleClick = e => {
    if (e.metaKey) {
      selectIfUnselected()
    } else {
      props.openPhoto()
    }
  }

  return (
    <Element
      className={cx({
        isSelected: props.isSelected,
      })}
      onClick={e => handleClick(e)}
    >
      <Selector
        className={cx('selector', {
          isSelected: props.isSelected,
        })}
        onMouseOver={e => e.stopPropagation()}
        onClick={() => selectIfUnselected()}
      />
      <Img src={props.src} />
    </Element>
  )
}

const SelectStatus = props => {
  return (
    <SelectStatusContainer
      className={cx({
        show: props.show,
      })}
    >
      <p>
        Selected <b>{props.selected.length || 1}</b> Images
      </p>
    </SelectStatusContainer>
  )
}

const PhotosPage = () => {
  const match = useRouteMatch('/photos/upload')
  const history = useHistory()
  const dispatch = useDispatch()

  const gridRef = useRef(null)

  const [selectedIds, setSelectedIds] = useState([])
  const [photos, setPhotos] = useState({
    byId: {},
    allIds: [],
  })

  // photo state replica
  const replicas = useRef()
  useEffect(() => {
    replicas.current = {
      photos,
      selectedIds,
    }
  }, [photos, selectedIds])

  // state change handlers
  const selectPhoto = id => setSelectedIds([...selectedIds, id])
  const unselectPhoto = id =>
    setSelectedIds(selectedIds.filter(entryId => entryId !== id))
  const unselectAllPhotos = () => setSelectedIds([])
  const selectAllPhotos = () =>
    setSelectedIds([...replicas.current.photos.allIds])

  //
  useOutsideClick(gridRef, isOutside => {
    if (isOutside && replicas.current.selectedIds.length > 0)
      unselectAllPhotos()
  })
  useHotkeys('cmd+a', e => {
    e.preventDefault()
    e.stopPropagation()
    selectAllPhotos()
  })

  useEffect(() => {
    // Initialze state
    const imageObject = dbImages.reduce((acc, image) => {
      acc[uuidv4()] = image
      return acc
    }, {})

    setPhotos({
      byId: imageObject,
      allIds: Object.keys(imageObject),
    })

    // Turn on DarkTheme
    dispatch({ type: setDarkTheme, payload: true })

    // Cleanup
    return () => {
      dispatch({ type: setDarkTheme, payload: false })
    }
  }, [])

  return (
    <Container>
      <Center>
        <div style={{ marginRight: match ? '450px' : '0px' }}>
          <Header>
            <Title>Photos</Title>
            {!match && (
              <Button onClick={() => history.push('/photos/upload')}>
                Upload
              </Button>
            )}
          </Header>
          <Grid ref={gridRef}>
            {photos.allIds.map(id => {
              const photo = photos.byId[id]
              const isSelected = selectedIds.includes(id)
              return (
                <Photo
                  openPhoto={() => history.push(`/photos/${id}`)}
                  key={id}
                  src={photo}
                  isSelected={isSelected}
                  select={() => selectPhoto(id)}
                  unselect={() => unselectPhoto(id)}
                />
              )
            })}
          </Grid>
        </div>
        {match && (
          <Side>
            <Center>
              <Route
                path='/photos/upload'
                render={({ match }) => {
                  return <UploaderView />
                }}
              />
            </Center>
          </Side>
        )}
      </Center>
      <SelectStatus show={selectedIds.length > 0} selected={selectedIds} />
      <Switch>
        <Route path='/photos/upload' />
        <Route
          path='/photos/:id'
          render={({ match }) => {
            return <PhotoView src={photos.byId[match.params.id]} />
          }}
        />
      </Switch>
    </Container>
  )
}

export default PhotosPage
