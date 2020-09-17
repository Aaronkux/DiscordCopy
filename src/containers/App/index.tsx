import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import Sidebar from "../Sidebar"
import Channel from "../Channel"
import UserInfo from "../UserInfo"
import Chat from "../Chat"
import TopLayer from "./components/TopLayer"
import ContextMenu from "./components/ContextMenu"
import Initializing from "../../components/Initializing"
import { RootState } from "../../redux/configStore"
import { ConstantTypes as GlobalConstantTypes } from "../../redux/modules/global"
import socket from "../../utils/websocket"

const Container = styled.div`
  display: flex;
  overflow: hidden;
  transition: opacity 2000ms;
`

const MainContainer = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100vh;
  background-color: #36393f;
  color: #fff;
`

const LeftContainer = styled.div`
  flex: none;
  width: 240px;
  display: flex;
  flex-direction: column;
`

function App() {
  const isFetching = useSelector((state: RootState) => state.global.isFetching)
  const isInitialized = useSelector(
    (state: RootState) => state.global.isInitialized
  )
  const isError = useSelector((state: RootState) => state.global.isError)
  const userId = useSelector((state: RootState) => state.user.uid)
  const dispatch = useDispatch()

  const [hidden, setHidden] = useState(true)
  // 首次加载初始化
  useEffect(() => {
    dispatch({ type: GlobalConstantTypes.FETCH_SIGNAL })
  }, [dispatch])

  //全局禁止监听鼠标右键
  useEffect(() => {
    window.addEventListener("contextmenu", (e) => {
      e.preventDefault()
    })
  }, [])

  useEffect(() => {
    socket.emit("baseInfo", userId)
  }, [userId])
  return (
    <Fragment>
      {isFetching ? (
        <Initializing />
      ) : isError ? (
        "error"
      ) : !isInitialized ? (
        <Initializing />
      ) : (
        <Container onClick={() => setHidden(!hidden)}>
          <Sidebar />
          <MainContainer>
            <LeftContainer>
              <Channel />
              <UserInfo />
            </LeftContainer>
            <Chat />
          </MainContainer>
        </Container>
      )}
      <TopLayer />
      <ContextMenu />
    </Fragment>
  )
}

export default React.memo(App)
