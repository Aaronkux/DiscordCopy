import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.85);
  z-index: 10;
  transform: translateZ(0);
  display: flex;
  justify-content: center;
  align-items: center;
`

type PropsType = {
  hidden: boolean,
  handleClick(): void;
  children?: React.ReactNode
}

function Cover({ hidden, handleClick, children }: PropsType) {
  const dispatch = useDispatch()
  return (
    <Container hidden={hidden} onClick={()=>dispatch(handleClick())} >
      {children}
    </Container>
  )
}

export default React.memo(Cover)
