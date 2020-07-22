import React, { useEffect, useRef, useState, Fragment } from "react"
import styled from "styled-components"
import { useRouteMatch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { createSelector } from "reselect"

import Message from "./components/Message"
import InputText from "./components/InputText"
import { headerStyle } from "../Channel"
import {
  actionFns as messageFns,
  Message as MessageType,
} from "../../redux/modules/message"
import { actionFns as scrollFns } from "../../redux/modules/scroll"
import { actionFns as channelFns } from "../../redux/modules/channel"
import { RootState } from "../../redux/configStore"
import MemberList from "../MemberList"
import Spinner from "./components/Spinner"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
`
const Header = styled.div`
  ${headerStyle}
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  /* scroll-behavior: smooth; */
`

const MoreMessage = styled.div`
  color: #7289da;
  flex-basis: 32px;
  border-radius: 3px;
  margin: 16px 16px 16px 6px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  text-align: center;
  line-height: 32px;
`

const MessageInputMessageContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`

const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

function compare(a: MessageType, b: MessageType) {
  if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) {
    return -1
  } else if (Date.parse(a.createdAt) < Date.parse(b.createdAt)) {
    return 1
  } else {
    return 0
  }
}

const MessageList = ({ msgIds }: { msgIds: number[] }) => {
  const messageState = useSelector((state: RootState) => state.info.message)
  const sortedMessage = msgIds
    .map((id) => messageState[id.toString()])
    .sort(compare)
  return (
    <Fragment>
      {sortedMessage.map((message) => (
        <Message
          key={message.uid}
          content={message.content}
          name="admin"
          avatar="https://cdn.discordapp.com/avatars/278036884637351936/8c7ebea3b8d97acbda26f6619f9c365e.png?size=128"
          date={message.createdAt}
        />
      ))}
    </Fragment>
  )
}

const isBottom = (element: HTMLDivElement) => {
  return element.scrollTop === element.scrollHeight - element.clientHeight
}

const moveToBottom = (element: HTMLDivElement) => {
  console.log("move to bottom")
  if (element) {
    element.scrollTop = element.scrollHeight - element.clientHeight
  }
}

const moveToCertainTop = (element: HTMLDivElement, top: number) => {
  console.log("move to " + top)
  if (element) {
    element.scrollTop = top
  }
}

const channelSelector = (state: RootState) => state.info.channel
const scrollSelector = (state: RootState) => state.scroll

const channelInfoSelector = createSelector(
  channelSelector,
  (state: RootState, channelId: string) => channelId,
  (channelState, channelId) => {
    if (channelId) {
      const { messageIds, msgFetched, name, moreMessage } = channelState[
        channelId
      ]
      return { messageIds, msgFetched, name, moreMessage }
    } else {
      return { messageIds: [], msgFetched: false, name: "", moreMessage: false }
    }
  }
)

const scrollInfoSelector = createSelector(scrollSelector, (scrollState) => {
  const { needScroll, oldScrollHeight } = scrollState
  return { needScroll, oldScrollHeight }
})

function Chat() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [oldGuildId, setoldGuildId] = useState(0)
  const guildMatch = useRouteMatch<{ guildId: string }>({
    path: "/app/:guildId",
  })
  const match = useRouteMatch<{ channelId: string; guildId: string }>({
    path: "/app/:guildId/:channelId",
  })
  const dispatch = useDispatch()
  const guildId = guildMatch?.params.guildId
  const channelId = match?.params.channelId ? match?.params.channelId : ""

  const channelState = useSelector((state: RootState) =>
    channelInfoSelector(state, channelId)
  )

  const scrollState = useSelector((state: RootState) =>
    scrollInfoSelector(state)
  )

  // set all channel's isvalid to false when change guild
  // so that we can update next time with msgFetched===true && valid ===false
  useEffect(() => {
    if (guildId) {
      setoldGuildId(Number(guildId))
    }
    if (guildId && oldGuildId && oldGuildId !== Number(guildId)) {
      dispatch(channelFns.msgNotValid())
    }
  }, [guildId, dispatch, oldGuildId])

  // initial msg fetch
  useEffect(() => {
    if (channelId && !channelState.msgFetched) {
      dispatch(messageFns.fetchMessage(Number(channelId)))
    } else {
      if (containerRef.current) moveToBottom(containerRef.current)
    }
  }, [channelId, channelState, dispatch])

  //滚动
  useEffect(() => {
    if (scrollState.needScroll && containerRef.current) {
      console.log("scroll")
      if (!isFinite(scrollState.oldScrollHeight)) {
        moveToBottom(containerRef.current)
        console.log(containerRef.current.scrollHeight)
      } else {
        moveToCertainTop(
          containerRef.current,
          containerRef.current.scrollHeight - scrollState.oldScrollHeight
        )
      }
      dispatch(scrollFns.cancelScroll())
    }
  }, [containerRef, scrollState, channelState, dispatch])

  return (
    <Container>
      <Header>{channelState?.name}</Header>
      <MessageInputMessageContainer>
        <MessageInputContainer>
          <MessageContainer
            ref={containerRef}
            onScroll={() => {
              // 下拉更新判断
              if (
                containerRef!.current!.scrollTop === 0 &&
                channelState.moreMessage === true
              ) {
                dispatch(
                  messageFns.fetchOldMessage(
                    Number(channelId),
                    containerRef.current!.scrollHeight
                  )
                )
              }
              // 滚动是否到底(用于websocket获取新消息时判断当前是否在底部而决定滚动)
              if (isBottom(containerRef!.current as HTMLDivElement)) {
                dispatch(scrollFns.setIsAtBottom(true))
              } else {
                dispatch(scrollFns.setIsAtBottom(false))
              }
            }}
          >
            <Spinner hidden={!channelId || channelState.msgFetched} />
            {/* more msg */}
            {channelState?.moreMessage ? (
              <MoreMessage>加载更多消息</MoreMessage>
            ) : (
              ""
            )}
            {channelState.messageIds.length ? (
              <MessageList msgIds={channelState.messageIds} />
            ) : (
              <Fragment />
            )}
          </MessageContainer>
          {channelId ? (
            <InputText setAutoScroll={() => {}} channelId={channelId} />
          ) : (
            ""
          )}
        </MessageInputContainer>
        {guildId ? <MemberList guildId={guildId} /> : ""}
      </MessageInputMessageContainer>
    </Container>
  )
}

export default React.memo(Chat)
