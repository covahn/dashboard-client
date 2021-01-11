import styled from 'styled-components'

export const Container = styled.div`
  color: #fff;
`

export const Bar = styled.div`
  width: 0%;
  transition: 0.2s;
  height: 5px;
  border-radius: 4px;
  margin: 20px 0px;
  background: #4992e1;
`

export const File = styled.div`
  display: flex;
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`

export const FileThumbnail = styled.img`
  height: 50px;
  width: auto;
  filter: blur(8px);
  transition: 0.2s;

  &.loaded {
    filter: blur(0px);
  }
`

export const FileInfo = styled.div``
