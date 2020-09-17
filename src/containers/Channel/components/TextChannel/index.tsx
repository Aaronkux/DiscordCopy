import React, { Fragment } from "react"
import { NavLink, NavLinkProps } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import HashTag from "../../../../svg/hashTag.svg"
import { actionFns as topLayerFns } from "../../../../redux/modules/topLayerStatus"
import { actionFns as websocketFns } from "../../../../redux/modules/websocket"
import { RootState } from "../../../../redux/configStore"

const Container = styled.div`
  overflow: hidden;
`

const StyledHashSvg = styled(HashTag)`
  margin-right: 6px;
`

interface StyledNavLinkProps extends NavLinkProps {
  order: number
}

const normalClassName = "nav-panel"
const activeClassName = "nav-panel-active"

const StyledNavLink = styled(({ order, ...rest }: StyledNavLinkProps) => (
  <NavLink {...rest} />
)).attrs({
  className: normalClassName,
  activeClassName,
})`
  display: inline-block;
  width: 100%;
  &.${normalClassName} {
    color: #fff;
    order: ${(props) => props.order};
    margin-left: 8px;
    &:hover {
      background-color: ${(props) => props.theme.color.bgPannelHover};
    }
  }
  &.${activeClassName} {
    background-color: ${(props) => props.theme.color.bgPannelActive};
  }
`

const PannelContainer = styled.div`
  font-weight: 500;
  height: 32px;
  padding: 8px;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
`

const UserContainer = styled.div`
  margin: 6px 0 4px 50px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #8e9297;
`

const UserAvatar = styled.div<{ avatar: string }>`
  margin-right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-image: url(${(props) => props.avatar});
  background-repeat: round;
  position: relative;
`

type PropsType = {
  channelName: string
  url: string
  order: number
  channelIdForWebsocket: number
  guildIdForWebsocket: number
  uid?: number
  guildId?: number
}

function Text({
  channelName,
  url,
  order,
  uid,
  guildId,
  channelIdForWebsocket,
  guildIdForWebsocket,
}: PropsType) {
  const dispatch = useDispatch()
  const usersPositionInGuild = useSelector(
    (state: RootState) => state.websocket.usersPositionInGuild
  )
  const userIds = usersPositionInGuild[channelIdForWebsocket] ? usersPositionInGuild[channelIdForWebsocket] : []
  const members = useSelector((state: RootState) => state.info.member)
  return (
    <Fragment>
      <Container>
        <StyledNavLink
          order={order}
          to={url}
          onContextMenu={(e) => {
            if (guildId) {
              dispatch(
                topLayerFns.udateContextMenu(
                  e.clientX,
                  e.clientY,
                  2,
                  Number(guildId),
                  uid
                )
              )
            }
            e.preventDefault()
            e.stopPropagation()
          }}
          onClick={() => {
            dispatch(
              websocketFns.changeCurrentChannel(
                channelIdForWebsocket,
                guildIdForWebsocket
              )
            )
          }}
        >
          <PannelContainer>
            <StyledHashSvg />
            {channelName}
          </PannelContainer>
        </StyledNavLink>
      </Container>
      {userIds.length !== 0 ? (
        userIds.map((userId) => (
          <UserContainer key={userId}>
            <UserAvatar avatar={members[userId.toString()].avatar} />
            {members[userId.toString()].name}
          </UserContainer>
        ))
      ) : (
        <Fragment />
      )}
    </Fragment>
  )
}

export default React.memo(Text)
