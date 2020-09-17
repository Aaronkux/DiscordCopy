import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { Menu } from "antd"
import { actionFns as topLayerFns } from "../../../../../../redux/modules/topLayerStatus"

type StyledMenuProps = {
  x: number
  y: number
}

const StyledMenu = styled(Menu).attrs({
  theme: "dark",
})<StyledMenuProps>`
  background-color: #18191c;
  padding: 10px;
  width: 180px;
  border-radius: 5px;
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`

type PropsType = {
  x: number
  y: number
}

function ChannelMenu({ x, y }: PropsType) {
  const dispatch = useDispatch()
  const cb = useCallback(
    () => dispatch(topLayerFns.udateContextMenu(0, 0, 0)),
    [dispatch]
  )

  useEffect(() => {
    window.addEventListener("click", cb)
    return () => {
      window.removeEventListener("click", cb)
    }
  }, [cb])
  return (
    <StyledMenu x={x} y={y}>
      <Menu.Item onClick={() => dispatch(topLayerFns.toggleNewChannelLayer())}>
        新建频道
      </Menu.Item>
    </StyledMenu>
  )
}

export default React.memo(ChannelMenu)
