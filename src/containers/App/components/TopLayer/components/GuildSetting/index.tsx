import React, { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled, { css } from "styled-components"
import { message } from "antd"
import { store } from "../../../../../../index"

import { actionFns as guildFns } from "../../../../../../redux/modules/guild"
import {
  ImgInputArea,
  ImgInputWrapper,
  ImgText,
  DisplayLabel,
  HiddenInput,
  ImgSmall,
} from "../SelectNewOrJoin/components/NewGuild"
import { RootState } from "../../../../../../redux/configStore"

import { actionFns as topLayerFns } from "../../../../../../redux/modules/topLayerStatus"

export const containerStyle = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
`

const Container = styled.div`
  ${containerStyle}
`

export const leftContainerStyle = css`
  flex: 1 0 218px;
  background-color: #2f3136;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`

const LeftContainer = styled.div`
  ${leftContainerStyle}
`

export const navBarStyle = css`
  width: 218px;
  margin-right: 6px;
  padding: 60px 6px 60px 20px;
`

const NavBar = styled.div`
  ${navBarStyle}
`

export const rightContainerStyle = css`
  flex: 2 0 660px;
  background-color: #36393f;
`

const RightContainer = styled.div`
  ${rightContainerStyle}
`

export const detailSettingStyle = css`
  width: 660px;
  padding: 60px 40px;
`

const DetailSetting = styled.div`
  ${detailSettingStyle};
  position: relative;
  display: flex;
  flex-direction: column;
`

export const navItemStyle = css`
  width: 192px;
  height: 32px;
  line-height: 18px;
  padding: 6px 10px;
  border-radius: 3px;
  margin-bottom: 3px;
`

const NavItem = styled.div<{ current?: boolean }>`
  ${navItemStyle};
  cursor: ${(props) => (props.current ? "default" : "pointer")};
  background-color: ${(props) =>
    props.current ? props.theme.color.bgPannelActive : "transparent"};
  color: ${(props) => (props.current ? "#fff" : "#b9bbbe")};
  &:hover {
    background-color: ${(props) =>
      props.current
        ? props.theme.color.bgPannelActive
        : props.theme.color.bgPannelHover};
    color: #fff;
  }
`

const ChangeArea = styled.div`
  display: flex;
  justify-content: space-around;
`

const NameInputArea = styled.div`
  width: 276px;
  height: 64px;
`

const NameLabel = styled.label`
  color: #87909c;
  font-size: 14px;
  display: inline-block;
  margin-bottom: 10px;
`

const NameInput = styled.input`
  width: 310px;
  height: 40px;
  outline: none;
  border: 1px solid #040405;
  background-color: rgba(0, 0, 0, 0.1);
  color: #dcddde;
  padding: 10px;
`

const Divider = styled.div`
  border-top: 1px solid #555555;
  margin: 50px 0;
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
  align-self: flex-end;
`

const EscButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid #72767d;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: 60px;
  background-color: #36393f;

  &:hover {
    background-color: #46494f;
  }
`

const validateWorker = (...fns: ((data: File) => undefined | string)[]) => (
  value: File
) => fns.map((fn) => fn(value)).filter((msg) => msg !== undefined)

const validate = {
  isImgFile: (errMsg: string) => {
    return (file: File) => {
      const types = ["image/jpeg", "image/png", "image/gif"]
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
  },
}

export const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  fileReaderCallback: (imgDataURL: string) => void
) => {
  const file = e.target?.files && e.target.files[0]
  if (file) {
    const msgArr = validateWorker(
      validate.isImgFile("FILE TYPE NOT ACCEPT"),
      validate.fileNotExceedLimit("FILE LARGE THAN 2", 5)
    )(file)
    if (msgArr.length !== 0) {
      msgArr.forEach((msg) => message.error(msg, 5))
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        fileReaderCallback(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
}

type PropsType = {
  hidden: boolean
  guildId: number
}

//handler
const keyboardEventHandler = (e: KeyboardEvent) => {
  if (e.keyCode === 27) {
    store.dispatch(topLayerFns.toggleGuildSettingLayer())
  }
}

function GuildSetting({ hidden, guildId }: PropsType) {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const [bgUrl, setBgUrl] = useState("")
  const [value, setValue] = useState("")
  const guildName = useSelector(
    (state: RootState) => state.info.guild[guildId.toString()].name
  )
  const guildAvatar = useSelector(
    (state: RootState) => state.info.guild[guildId.toString()].avatar
  )

  useEffect(() => {
    setBgUrl(guildAvatar)
    setValue(guildName)
  }, [guildName, guildAvatar, setBgUrl, setValue])

  useEffect(() => {
    window.addEventListener("keyup", keyboardEventHandler)
    return () => {
      window.removeEventListener("keyup", keyboardEventHandler)
    }
  }, [])

  return (
    <Container hidden={hidden}>
      <LeftContainer>
        <NavBar>
          <NavItem current>概要</NavItem>
          <NavItem>删除服务器</NavItem>
        </NavBar>
      </LeftContainer>
      <RightContainer>
        <DetailSetting>
          <ChangeArea>
            <ImgInputArea>
              <ImgInputWrapper
                bgUrl={bgUrl}
                onClick={() => inputRef.current!.click()}
              >
                <DisplayLabel />
                <HiddenInput
                  ref={inputRef}
                  onChange={(e) =>
                    handleFileChange(e, (imgDataURL) => {
                      setBgUrl(imgDataURL)
                    })
                  }
                />
                {bgUrl === "" ? <ImgText>点击上传头像</ImgText> : ""}
              </ImgInputWrapper>
              <ImgSmall>最小尺寸: 128x128</ImgSmall>
            </ImgInputArea>
            <NameInputArea>
              <NameLabel>服务器名称</NameLabel>
              <NameInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </NameInputArea>
          </ChangeArea>
          <Divider />
          <SubmitButton
            onClick={() => {
              const file = inputRef?.current?.files
                ? inputRef?.current?.files[0]
                : null
              if (file) {
                dispatch(guildFns.patchGuild(guildId, value, file))
              } else {
                dispatch(guildFns.patchGuild(guildId, value))
              }
            }}
          >
            保存修改
          </SubmitButton>

          <EscButton
            onClick={() => dispatch(topLayerFns.toggleGuildSettingLayer())}
          >
            X
          </EscButton>
        </DetailSetting>
      </RightContainer>
    </Container>
  )
}

export default React.memo(GuildSetting)
