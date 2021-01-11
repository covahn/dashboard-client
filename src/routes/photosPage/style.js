import styled from 'styled-components'

import svg_checkmark from 'static/checkmark.svg'

export const Side = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #191919;
  border-left: 1px solid #282828;
  width: 450px;
  overflow-y: auto;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

export const SelectStatusContainer = styled.div`
  height: 60px;
  border-radius: 8px;
  width: 300px;
  background-color: #333333;

  position: fixed;
  bottom: 0px;
  right: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  opacity: 0;

  transition: 0.2s;

  &.show {
    bottom: 20px;
    opacity: 1;
  }
`
export const Grid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`

export const Element = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: auto;
  place-self: center stretch;

  transition: 0.15s;

  &:hover,
  &.isSelected {
    transform: scale(1.03);

    & > .selector {
      display: initial;
    }
  }
`

export const Selector = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  border-radius: 12px;
  width: 22px;
  height: 22px;
  border: 2.5px solid #fff;

  box-sizing: border-box;
  display: none;

  &.isSelected {
    background-image: url(${svg_checkmark});
    background-size: 100% 100%;
    background-color: #fff;
  }
`

export const Img = styled.img`
  max-width: 100%;
  height: auto;

  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`

export const Center = styled.div`
  padding: 0px 30px;
  margin: 0px auto;
  margin-bottom: 50px;
`

export const Container = styled.div``

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
`

export const Title = styled.h2`
  color: #fff;
  margin: 0px;
  padding: 0px;
`

export const Button = styled.button`
  height: 40px;
`
