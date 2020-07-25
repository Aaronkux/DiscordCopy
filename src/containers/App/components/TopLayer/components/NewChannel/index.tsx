import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { RootState } from '../../../../../../redux/configStore'
import { actionFns as channelFns } from '../../../../../../redux/modules/channel'

const Container = styled.div`
  width: 440px;
  background-color: #36393f;
  border-radius: 5px;

  &.new-channel-appear {
    transform: scale(0, 0)
  }

  &.new-channel-appear-active {
    transform: scale(1, 1);
    transition: transform 500ms;
  }
`

const Header = styled.header`
  width: 440px;
  padding: 20px;
  height: 60px;
  color: #fff;
`

const TypeAndName = styled.div`
  width: 440px;
  height: 228px;
  padding: 20px;
`

const Text = styled.p`
  font-size: 12px;
  padding: 0;
  margin: 0;
  color: #8e9297;
`

const Selection = styled.div<{ current: boolean }>`
  border-radius: 5px;
  width: 400px;
  height: 46px;
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid ${props => props.current ? 'rgb(114, 137, 218)' : '#202225'};
  color: #fff;
  background-color: ${props => props.current ? '#7289da' : '#303237'};
  cursor: pointer;
`

const NameInput = styled.input`
  border-radius: 5px;
  outline: none;
  width: 400px;
  height: 46px;
  padding: 10px;
  background-color: #303237;
  border: 1px solid #202225;
  color: #eeeeee;
`

const Bottom = styled.div`
  width: 440px;
  height: 78px;
  padding: 20px;
  background-color: #2f3136;
  display: flex;
  justify-content: flex-end;
`

const SubmitButton = styled.button`
  width: 96px;
  height: 34px;
  padding: 2px 16px;
  background-color: #7289da;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
`

function NewChannel() {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const parentIdState = useSelector((state: RootState) => state.topLayerStatus.parentId)
  const parentId = parentIdState ? parentIdState : 0;
  const channelState = useSelector((state: RootState) => state.info.channel)
  const guildId = useSelector((state: RootState) => state.topLayerStatus.guildId)
  const parentType = parentId !== 0 ? channelState[parentId.toString()].channelType : null
  const initialSelection = parentType === null ? 0 : 1
  const [selection, setSelection] = useState(initialSelection)
  return (
    <CSSTransition
      in={true}
      classNames='new-channel'
      appear
      timeout={{
        appear: 500,
      }}>
      <Container onClick={e => e.stopPropagation()}>
        <Header>建立{selection === 0 ? '类别标签' : '文字频道'}</Header>
        <TypeAndName>
          <Text>频道类型</Text>
          {parentType === null ?
            <Selection onClick={() => setSelection(0)} current={selection === 0}>类别标签</Selection>
            : ''}
          {parentType !== 1 ?
            <Selection onClick={() => setSelection(1)} current={selection === 1}>文字频道</Selection>
            : ''}
          <Text>频道名称</Text>
          <NameInput value={value} onChange={e => setValue(e.target.value)} />
        </TypeAndName>
        <Bottom>
          <SubmitButton onClick={() => dispatch(channelFns.addChannel(value, selection, guildId, parentId))}>建立频道</SubmitButton>
        </Bottom>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(NewChannel)
