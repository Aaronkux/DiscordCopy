import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/configStore'
import AvatarWithStatus from '../../components/AvatarWithStatus'

const Container = styled.div`
  flex: 0 0 240px;
  background-color: #2f3136;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 8px;
`

const InnerContainer = styled.div`
  border-radius: 5px;
  padding: 0 8px;
  margin-bottom: 4px;
  &:hover {
    background-color: #34373c;
  }
`

const AvatarContainer = styled.div`
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
`

const Name = styled.span`
  margin-left: 10px;
  color: #8e9297;
  font-size: 13px;
`
type PropsType = {
  guildId: string
}

function MemberList({ guildId }: PropsType) {
  const memberIds = useSelector((state: RootState) => state.info.guild[guildId].usersUids)
  const members = useSelector((state: RootState) => state.info.member)
  const onlineUsers = useSelector((state: RootState) => state.websocket.onlineUsers[guildId])
  console.log(onlineUsers ? onlineUsers.includes(memberIds[0]) : 'not exist')
  return (
    <Container>
      {memberIds ? memberIds.map(memberId => {
        return (
          <InnerContainer key={memberId}>
            <AvatarContainer>
              <AvatarWithStatus avatar={members[memberId.toString()].avatar} online={onlineUsers ? onlineUsers.includes(memberId) : false} />
              <Name>
                {members[memberId.toString()].name}
              </Name>
            </AvatarContainer>
          </InnerContainer>
        )
      }) : ''}

    </Container>
  )
}


export default React.memo(MemberList)
