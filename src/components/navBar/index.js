import React from 'react'
import styled, { keyframes } from 'styled-components'

import svg_home from 'static/home.svg'
import svg_photos from 'static/photos.svg'
import svg_more from 'static/more.svg'
import svg_arrowUp from 'static/arrowUp.svg'
import svg_generator from 'static/stars.svg'
import svg_user from 'static/user.svg'

import { NavLink } from 'react-router-dom'

function Tab(props) {
  return (
    <TabContainer to={props.path}>
      <Icon src={props.iconSrc} />
      {props.children}
    </TabContainer>
  )
}

function NavBar() {
  return (
    <Container>
      <div>
        <Tab path='/account' iconSrc={svg_user}>
          Account
        </Tab>
      </div>
      <div>
        <Logo></Logo>
        <Tab path='/home' iconSrc={svg_home}>
          Home
        </Tab>
        <Tab path='/photos' iconSrc={svg_photos}>
          Photos
        </Tab>
        <Tab path='/generator' iconSrc={svg_generator}>
          Generator
        </Tab>
        <Tab path='/more' iconSrc={svg_more}>
          More
        </Tab>
      </div>
      <div>
        <Tab path='/more' iconSrc={svg_arrowUp}>
          Account
        </Tab>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  filter: ${props => (props.theme.name === 'dark' ? 'invert(90%)' : 'initial')};
  background-color: #fff;
  transition: 0.5s;
`

const Logo = styled.div`
  width: 100%;
  height: 0px;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-bottom: 3px;
`

const TabContainer = styled(NavLink)`
  margin: 10px;
  border-radius: 9px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid transparent;

  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  color: #1d1d1f;

  transition: 0.12s;

  &:hover {
    border: 2px solid rgba(0, 0, 0, 0.1);
    margin: 10px;
  }

  &:active {
    transform: scale(0.97);
    border: 2px solid rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    margin: 10px;
  }
`

export default NavBar
