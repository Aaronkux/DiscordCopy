import React, { useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { RootState } from '../../redux/configStore'
import { Channel as ChannelType } from '../../redux/modules/channel'
import Tag from './components/TagChannel'
import Text from './components/TextChannel'
import { actionFns as guildFns } from '../../redux/modules/guild'
import { actionFns as topLayerFns } from '../../redux/modules/topLayerStatus'

import SettingSvg from '../../svg/setting.svg'

const Container = styled.div`
  flex-grow: 1;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  background-color: ${props => props.theme.color.bgSecondary};
`
export const headerStyle = css`
  flex-basis: 48px;
  flex-shrink:0;
  box-shadow: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 900;
`

const Header = styled.div`
  ${headerStyle}
`

const ChannelName = styled.span`
  font-size: 12px;
  &::first-letter {
    text-transform: uppercase;
  }
`

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-right: 8px;
  overflow: auto;
`

const SVGWrapper = styled.div`
  line-height: 0;
  transition: transform 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: rotate(180deg);
  }
`

type CombinationChannel = ChannelType & {
  childChannels?: ChannelType[]
}

function arrangeChannels(channels: ChannelType[]) {
  const rootChannels: CombinationChannel[] = channels.filter(channel => !channel.parentId)
  const childChannels = channels.filter(channel => channel.parentId)
  for (let rootChannel of rootChannels) {
    rootChannel.childChannels = []
    for (let childChannel of childChannels) {
      if (childChannel.parentId === rootChannel.uid) {
        rootChannel.childChannels.push(childChannel)
      }
    }
  }
  return rootChannels
}

function Channel() {
  const dispatch = useDispatch()
  const match = useRouteMatch<{ guildId: string }>({ path: '/app/:guildId' })
  const guildId = match?.params.guildId
  const guildState = useSelector((state: RootState) => state.info.guild)
  const channelState = useSelector((state: RootState) => state.info.channel)
  const guild = guildId ? guildState[guildId.toString()] : undefined
  const channels = guild?.channelsUids?.map(channelId => channelState[channelId.toString()])
  const renderChannels = channels ? arrangeChannels(JSON.parse(JSON.stringify(channels))) : undefined
  //更新成功状态下会有一次不必要更新，可忽略
  useEffect(() => {
    if (guildId) {
      const changeTime = guildState[guildId?.toString()].changeTime
      dispatch(guildFns.fetchGuild(Number(guildId), changeTime))
    }
  }, [dispatch, guildId, guildState])

  return (
    <Container>

      <Header>
        <ChannelName>
          {guild?.name}
        </ChannelName>
        {guildId ?
          <SVGWrapper onClick={() => {
            dispatch(topLayerFns.toggleGuildSettingLayer())
            dispatch(topLayerFns.changeGuildId(Number(guildId)))
          }}>
            <SettingSvg />
          </SVGWrapper>
          : ''}
      </Header>

      <Content onContextMenu={(e) => { if (guildId) dispatch(topLayerFns.udateContextMenu(e.clientX, e.clientY, 2, Number(guildId), 0)) }}>
        {renderChannels ? renderChannels.map(renderChannel => {
          if (renderChannel.channelType === 0) {
            const renderChild = renderChannel.childChannels?.map(childChannel =>
              <Text
                guildIdForWebsocket={Number(guildId)}
                channelIdForWebsocket={childChannel.uid}
                key={childChannel.uid}
                channelName={childChannel.name}
                order={childChannel.position}
                url={`${match!.url}/${childChannel.uid.toString()}`}
              />
            )
            return <Tag guildId={Number(guildId)} uid={renderChannel.uid} key={renderChannel.uid} title={renderChannel.name} order={renderChannel.position} children={renderChild} />
          } else {
            return <Text
              guildIdForWebsocket={Number(guildId)}
              channelIdForWebsocket={renderChannel.uid}
              guildId={Number(guildId)}
              uid={renderChannel.uid}
              key={renderChannel.uid}
              channelName={renderChannel.name}
              order={renderChannel.position}
              url={`${match!.url}/${renderChannel.uid.toString()}`}
            />
          }
        }) : ''}
      </Content>
    </Container >
  )
}

export default React.memo(Channel)
