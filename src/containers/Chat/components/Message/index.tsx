import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { RootState } from "../../../../redux/configStore"

const Container = styled.div`
  padding: 2px 48px 10px 72px;
  margin-top: 10px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
  &:hover {
    background-color: rgba(4, 4, 5, 0.07);
  }
`
const Header = styled.div`
  flex-basis: 22px;
  flex-grow: 0;
`

const NameSpan = styled.span`
  color: #e67e22;
  margin-right: 8px;
`

const DateSpan = styled.span`
  color: #72767d;
  font-size: 12px;
`
const Content = styled.div`
  color: #dcddde;
`

const Avatar = styled.img`
  border-radius: 50%;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 16px;
  top: 4px;
`

type PropsType = {
  userId: number
  date: string
  content: string
}

const selectNameAndAvatar = createSelector(
  (state: RootState) => state.info.member,
  (state: RootState, userId: number) => userId,
  (members, userId) => {
    const { name, avatar } = members[userId.toString()]
    return { name, avatar }
  }
)

function Message({ userId, date, content }: PropsType) {
  const { name, avatar } = useSelector((state: RootState) => selectNameAndAvatar(state, userId))
  return (
    <Container>
      <Header>
        <NameSpan>{name}</NameSpan>
        <DateSpan>{date}</DateSpan>
      </Header>
      <Content>{content}</Content>
      <Avatar src={avatar} />
    </Container>
  )
}

export default React.memo(Message)
