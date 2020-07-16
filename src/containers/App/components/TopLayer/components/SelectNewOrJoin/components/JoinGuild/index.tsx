import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

const Container = styled.div`
  &.join-container-appear {
    transform: translateX(100%)
  }

  &.join-container-appear-active {
    transition: transform 0.5s ease-in-out;
    transform: translateX(0);
  }
`

const Header = styled.header`
  color: #43b581;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
`

const Notice = styled.p`
  font-weight: 500;
  margin: 20px 0;
  color: #747f8d;
  font-size: 18px;
  text-align: center;
`

const Simple = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #7289da;
  text-align: center;
  margin-bottom: 0;
`

const LinkInput = styled.input.attrs({
  type: 'text'
})`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 382px;
  padding: 10px 4px;
  outline: none;
  border: none;
  border-bottom: 2px solid #e3e5e8;
  margin-bottom: 20px;
`

const BottomArea = styled.div`
  height: 74px;
  position: relative;
  left: -32px;
  width: 540px;
  background-color: #f6f6f7;
  padding: 18px 40px;
  display: flex;
  justify-content: space-between;
`

const ReturnButton = styled.button`
  border: none;
  background-color: #f6f6f7;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    border-bottom: 2px solid #0a0a0a;
  }
`

const SubmitButton = styled.button`
  width: 96px;
  height: 34px;
  padding: 2px 16px;
  background-color: #43b581;
  border: none;
  color: #fff;
  border-radius: 3px;
`

type PropsType = {
  handleClick: React.Dispatch<React.SetStateAction<number>>
}

function JoinGuild({ handleClick }: PropsType) {
  return (
    <CSSTransition
      in={true}
      classNames='join-container'
      appear
      timeout={{
        enter: 500,
      }}
    >
      <Container>
        <Header>加入服务器</Header>
        <Notice>输入如下链接加入频道</Notice>
        <Simple>hTKzmak</Simple>
        <Simple>https://localhost:3000/hTKzmak</Simple>
        <LinkInput />
        <BottomArea>
          <ReturnButton onClick={() => handleClick(0)}>
            返回
        </ReturnButton>
          <SubmitButton>
            加入
          </SubmitButton>
        </BottomArea>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(JoinGuild)