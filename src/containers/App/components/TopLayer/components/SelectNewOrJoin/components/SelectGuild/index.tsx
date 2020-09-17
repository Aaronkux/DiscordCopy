import React from 'react'
import styled, { css } from 'styled-components'
import { CSSTransition } from 'react-transition-group';

import {ReactComponent as AddSvg} from './add.svg'
import {ReactComponent as JoinSvg} from './join.svg'

const Container = styled.div`
  &.select-container-appear {
    transform: translateX(-100%)
  }

  &.select-container-appear-active {
    transition: transform 0.5s ease-in-out;
    transform: translateX(0);
  }
`

const Header = styled.header`
  margin: 6px 0px 24px 0px;
  height: 30px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`

const AddOrJoin = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
`

const addOrJoinStyle = css`
  width: 228px;
  height: 242px;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.1);
  padding: 16px;
  cursor: pointer;
  transition: box-shadow 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    box-shadow: 0 1px 10px 5px rgba(0,0,0,0.05);
  }
`

const AddContainer = styled.div`
  ${addOrJoinStyle}
`

const JoinContainer = styled.div`
  ${addOrJoinStyle}
`

const InnerHeader = styled.div`
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`

const InnerBackGround = styled.div`
  margin: 26px 0;
  width: 194px;
  height: 78px;
`

const Button = styled.button<{ btnBgColor: string, btnBgActiveColor: string }>`
  width: 162px;
  height: 34px;
  padding: 2px 16px;
  border: none;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  background-color: ${props => props.btnBgColor};
  &:hover {
    background-color: ${props => props.btnBgActiveColor};
  }
`

type PropsType = {
  handleClick: React.Dispatch<React.SetStateAction<number>>
}

export default function SelectGuild({ handleClick}: PropsType) {
  return (
    <CSSTransition
      in={true}
      classNames='select-container'
      appear
      timeout={{
        enter: 500,
      }}
    >
      <Container>
        <Header>添加或加入服务器</Header>
        <AddOrJoin>
          <AddContainer onClick={() => handleClick(1)}>
            <InnerHeader>建立一个新的服务器</InnerHeader>
            <InnerBackGround>
              <AddSvg />
            </InnerBackGround>
            <Button btnBgColor='#7289da' btnBgActiveColor='#5b6eae' >建立服务器</Button>
          </AddContainer>
          <JoinContainer onClick={() => handleClick(2)}>
            <InnerHeader>输入邀请链接加入服务器</InnerHeader>
            <InnerBackGround >
              <JoinSvg />
            </InnerBackGround>
            <Button btnBgColor='#43b581' btnBgActiveColor='#369167'>加入服务器</Button>
          </JoinContainer>
        </AddOrJoin>
      </Container>
    </CSSTransition>
  )
}
