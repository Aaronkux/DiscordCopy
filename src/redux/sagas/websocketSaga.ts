import { take, put, select } from 'redux-saga/effects'
import socket from '../../utils/websocket'
import {
  ChangeCurrentGuild,
  ChangeCurrentChannel,
  ConstantTypes as WebsocketConstantTypes,
  actionFns as websocketFns
} from '../modules/websocket'
import { RootState } from '../configStore'

export function* changeCurrentGuild() {
  while (true) {
    const request: ChangeCurrentGuild = yield take(WebsocketConstantTypes.WS_CHANGE_CURRENT_GUILD)
    const { guildId } = request
    // whether new guild room is being listened
    const currentId: number = yield select((state: RootState) => state.websocket.currentId)
    // guildId 已经包含
    if (currentId !== guildId) {
      socket.emit('joinChannel', {
        channelIds: [guildId],
        guildId,
        current: null
      })
      yield put(websocketFns.changeCurrentId(guildId))
      yield put(websocketFns.setRoomId([guildId]))
    }
  }
}

export function* changeCurrentChannel() {
  while (true) {
    const request: ChangeCurrentChannel = yield take(WebsocketConstantTypes.WS_CHANGE_CURRENT_CHANNEL)
    const { guildId, channelId } = request
    // whether new channel room is being listened
    const roomIds: number[] = yield select((state: RootState) => state.websocket.roomIds)
    const currentId: number = yield select((state: RootState) => state.websocket.currentId)
    let channelIds = []
    if (roomIds.includes(channelId)) {
      if (currentId !== channelId) {
        channelIds = roomIds
        socket.emit('joinChannel', {
          channelIds,
          guildId,
          current: channelId
        })
        yield put(websocketFns.changeCurrentId(channelId))
        yield put(websocketFns.setRoomId(channelIds))
      }
    } else {
      channelIds = [...roomIds, channelId]
      socket.emit('joinChannel', {
        channelIds,
        guildId,
        current: channelId
      })
      yield put(websocketFns.changeCurrentId(channelId))
      yield put(websocketFns.setRoomId(channelIds))
    }
  }
}