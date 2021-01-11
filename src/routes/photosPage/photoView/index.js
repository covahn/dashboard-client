import React from 'react'
import { useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

function PhotoView(props) {
  const history = useHistory()

  return (
    <Container>
      <Main onClick={() => history.push('/photos')}>
        <Img src={props.src} />
      </Main>
      <SideBar></SideBar>
    </Container>
  )
}

const fade = keyframes`
  from {
    opacity: 0;
    transform: scale(1.06);
  }

  to {
    opacity: 1;
    transform: scale(1);

  }
`

const Container = styled.div`
  animation: ${fade} 0.3s;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(11, 11, 11, 0.9);
  display: flex;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Img = styled.img`
  width: 80%;
`

const SideBar = styled.div`
  width: 340px;
  background-color: #232323;
`

export default PhotoView
