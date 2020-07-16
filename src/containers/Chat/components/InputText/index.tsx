import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootState } from '../../../../redux/configStore'
import { actionFns as messageFns } from '../../../../redux/modules/message'
import AddFileSvg from '../../../../svg/addFile.svg'

const Container = styled.div`
  flex-basis: 68px;
  padding: 16px 16px 24px 16px;
  display: flex;
`

const ChannelTextArea = styled.div`
  background-color: #40444b;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
`

const AddFile = styled.div`
  flex-basis: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TextArea = styled.input.attrs({
  type: 'text',
  placeholder: 'send msg to channel'
})`
  border: none;
  flex-grow: 1;
  padding: 10px;
  margin-right: 8px;
  outline: none;
  background-color: #40444b;
`

type PropsType = {
  channelId: string,
  setAutoScroll: React.Dispatch<React.SetStateAction<boolean>>
}

function InputText({ channelId, setAutoScroll }: PropsType) {
  const [value, setValue] = useState('')
  const [isFocused, setFocus] = useState(false)
  const userId = useSelector((state: RootState) => state.user.uid)
  const dispatch = useDispatch()
  return (
    <Container>
      <ChannelTextArea>
        <AddFile>
          <AddFileSvg />
        </AddFile>
        <TextArea
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyUp={isFocused ? (e) => {
            if (e.keyCode === 13) {
              dispatch(messageFns.postMessage(value, userId!, Number(channelId)))
              setValue('')
              setAutoScroll(true)
            }
          }
            : undefined}
        />
      </ChannelTextArea>
    </Container>
  )
}

export default React.memo(InputText)