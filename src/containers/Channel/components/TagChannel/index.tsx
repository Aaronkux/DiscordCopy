import React, { useState } from 'react'
import styled from 'styled-components'
import {ReactComponent as ToggleSvg} from '../../../../svg/toggle.svg'
import { useDispatch } from 'react-redux'
import { actionFns as topLayerFns } from '../../../../redux/modules/topLayerStatus'

const Container = styled.div<{ order: number }>`
  margin-bottom: 15px;
  order: ${props => props.order};
`

const TagWrapper = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  color: #8e9297;
  margin: 10px 0;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`
const StyledSvg = styled(({ isHidden, ...rest }) => <ToggleSvg {...rest} />)`
  margin-left: 2px;
  margin-right: 4px;
  transform: ${props => props.isHidden ? 'rotate(-90deg)' : 'none'};
`

const ChildWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

type PropsType = {
  title: string,
  hidden?: boolean,
  order: number,
  children: React.ReactNode,
  uid: number,
  guildId: number
}

function Tag({ title, hidden, order, children, uid, guildId }: PropsType) {
  const dispatch = useDispatch()
  const [isHidden, toggle] = useState(hidden)
  return (
    <Container order={order} onContextMenu={(e) => {
      dispatch(topLayerFns.udateContextMenu(e.clientX, e.clientY, 2, Number(guildId), uid))
      e.preventDefault()
      e.stopPropagation()
    }}>
      <TagWrapper onClick={() => toggle(!isHidden)}>
        <StyledSvg isHidden={Boolean(isHidden)} />
        {title}
      </TagWrapper>
      <ChildWrapper hidden={Boolean(isHidden)}>
        {children}
      </ChildWrapper>
    </Container>
  )
}

export default React.memo(Tag)