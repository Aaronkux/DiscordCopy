import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';
import { message } from 'antd';

import { actionFns as guildFns } from '../../../../../../../../redux/modules/guild'

const Container = styled.div`
  &.new-container-appear {
    transform: translateX(100%)
  }

  &.new-container-appear-active {
    transition: transform 0.5s ease-in-out;
    transform: translateX(0);
  }
`

const Header = styled.header`
  color: #7289da;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
`

const InputArea = styled.div`
  height: 162px;
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const NameInputArea = styled.div`
  width: 235px;
  height: 157px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Label = styled.label`
  font-size: 11px;
  font-weight: 700;
`

const NameInput = styled.input.attrs({
  type: 'text',
  placeholder: 'your server name'
})`
  padding: 10px 4px;
  margin-top: 12px;
  font-size: 16px;
  outline: none;
  border: none;
  border-bottom: 1px solid #e3e5e8;
`

export const ImgInputArea = styled.div`
  width: 196px;
  height: 162px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ImgInputWrapper = styled.div<{ bgUrl: string }>`
  width: 128px;
  height: 128px;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
  background-color: #7288da;
  background-image: url(${props => props.bgUrl});
  background-size: cover;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0px 5px rgba(0,0,0,0.1);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0,0,255, 0.7);
  }
`

export const ImgText = styled.div`
  margin: 0;
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  cursor: pointer;
`

export const DisplayLabel = styled.button`
  cursor: pointer;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  opacity: 0;
`

export const HiddenInput = styled.input.attrs({
  type: 'file',
  accept: '.jpg,.jpeg,.png,.gif',
})`
  visibility: hidden;
  display: block;
`

export const ImgSmall = styled.small`
  text-align: center;
  color: #87909c;
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
  background-color: #7289da;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
`

type PropsType = {
  handleClick: React.Dispatch<React.SetStateAction<number>>
}

const validateWorker =
  (...fns: ((data: File) => undefined | string)[]) =>
    (value: File) =>
      fns.map(fn => fn(value)).filter(msg => msg !== undefined)

const validate = {
  isImgFile: (errMsg: string) => {
    return (file: File) => {
      const types = ['image/jpeg', 'image/png', 'image/gif']
      if (!types.includes(file.type)) {
        return errMsg
      }
    }
  },
  fileNotExceedLimit: (errMsg: string, limitMb: number) => {
    return (file: File) => {
      if (!(file.size / 1024 / 1024 < limitMb)) {
        return errMsg
      }
    }
  }
}


const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileReaderCallback: (imgDataURL: string) => void) => {
  const file = e.target?.files && e.target.files[0]
  if (file) {
    const msgArr = validateWorker(
      validate.isImgFile('FILE TYPE NOT ACCEPT'),
      validate.fileNotExceedLimit('FILE LARGE THAN 2', 5))(file)
    if (msgArr.length !== 0) {
      msgArr.forEach(msg => message.error(msg, 5))
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        fileReaderCallback(e.target?.result as string)
      }
      reader.readAsDataURL(file);
    }
  }
}

function NewGuild({ handleClick }: PropsType) {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [bgUrl, setBgUrl] = useState('')
  const [value, setValue] = useState('')
  return (
    <CSSTransition
      in={true}
      classNames='new-container'
      appear
      timeout={{
        enter: 500,
      }}
    >
      <Container>
        <Header>建立您的服务器</Header>
        <InputArea>
          <NameInputArea>
            <Label>服务器名称</Label>
            <NameInput value={value} onChange={e => setValue(e.target.value)} />
          </NameInputArea>
          <ImgInputArea>
            <ImgInputWrapper bgUrl={bgUrl} onClick={() => inputRef.current!.click()} >
              <DisplayLabel />
              <HiddenInput ref={inputRef} onChange={(e) => handleFileChange(e, (imgDataURL) => { setBgUrl(imgDataURL) })} />
              {
                bgUrl === '' ?
                  <ImgText>点击上传头像</ImgText> :
                  ''
              }
            </ImgInputWrapper>
            <ImgSmall>最小尺寸: 128x128</ImgSmall>
          </ImgInputArea>
        </InputArea>
        <BottomArea>
          <ReturnButton onClick={() => handleClick(0)}>返回</ReturnButton>
          <SubmitButton onClick={() => {
            const file = inputRef?.current?.files ? inputRef?.current?.files[0] : null
            if (file) {
              dispatch(guildFns.addGuild(value, file))
            } else {
              dispatch(guildFns.addGuild(value))
            }
          }}>建立</SubmitButton>
        </BottomArea>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(NewGuild)