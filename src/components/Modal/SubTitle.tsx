import React from "react"
import styled from "styled-components"

const Text = styled.p`
  font-size: 12px;
  padding: 0 4px;
  margin: 0;
  color: #8e9297;
`

type Proptype = {
  children?: string
}

function SubTitle({ children }: Proptype) {
  return <Text>{children}</Text>
}

export default React.memo(SubTitle)
