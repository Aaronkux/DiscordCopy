import io from "socket.io-client"
import { store } from "../index"
import { actionFns as websocketFns } from "../redux/modules/websocket"

import {
  actionFns as channelFns,
} from "../redux/modules/channel"
import {
  StateType as MessageStateType,
  actionFns as messageFns,
} from "../redux/modules/message"

import {
  actionFns as scrollFns
} from '../redux/modules/scroll'

const socket = io("http://localhost:3001/")
socket.on("connect", () => {
  store.dispatch(websocketFns.changeConnectState(true))
  console.log("connected")
  socket.on("guildUserOnline", (userIds: string, guildId: number) => {
    // console.log("guildUserOnline", guildId, JSON.parse(userIds))
    store.dispatch(websocketFns.setOnlineUser(guildId, JSON.parse(userIds)))
  })
  socket.on("usersPositionInGuild", (data: string) => {
    // console.log("usersPositionInGuild", JSON.parse(data))
    store.dispatch(websocketFns.setUsersPosition(JSON.parse(data)))
  })

  socket.on("addNewMessage", (data: string) => {
    const rawData = JSON.parse(data)
    let msgData: MessageStateType = {}
    msgData[rawData.uid.toString()] = rawData
    store.dispatch(messageFns.fetchSuccess(msgData))
    store.dispatch(channelFns.updateFetchMessageSucess([rawData.uid], rawData.parentId))
    const isAtBottom = store.getState().scroll.isAtBottom
    if (isAtBottom) {
      store.dispatch(scrollFns.setScroll())
    }
  })
})

export default socket
