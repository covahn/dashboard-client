import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

import Generator from 'routes/generatorPage'
import NavBar from 'components/navBar'
import Photos from 'routes/photosPage'

function App() {
  const darkTheme = useSelector(state => state.meta.dark)

  return (
    <ThemeProvider
      theme={
        darkTheme
          ? {
              name: 'dark',
            }
          : {
              name: 'light',
            }
      }
    >
      <GlobalStyle />
      <Container>
        <NavBarWrap>
          <NavBar />
        </NavBarWrap>
        <Main>
          <Switch>
            <Route path='/photos' render={() => <Photos></Photos>} />
            <Route path='/generator' render={() => <Generator></Generator>} />
          </Switch>
        </Main>
      </Container>
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props =>
      props.theme.name === 'dark' ? '#191919' : '#fff'};
    -webkit-font-smoothing: subpixel-antialiased;
  }
`

const sideBarWidth = 100

const Container = styled.div`
  width: 100%;
  display: flex;
`

const NavBarWrap = styled.div`
  flex: 1;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: ${sideBarWidth}px;
  background-color: #fff;
`

const Main = styled.div`
  flex: 1;
  margin-left: ${sideBarWidth}px;
`

export default App
