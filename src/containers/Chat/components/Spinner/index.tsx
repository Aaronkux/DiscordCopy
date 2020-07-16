import React from 'react'
import styled from 'styled-components'
import { Spin } from 'antd'

const SpinContainer = styled.div`
  flex-basis: 32px;
  margin: 16px 16px 16px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`
type PropTypes = {
  hidden: boolean
}

function Spinner({hidden}: PropTypes) {
  return (
    <SpinContainer hidden={hidden}>
      <Spin />
    </SpinContainer>
  )
}

export default React.memo(Spinner)
