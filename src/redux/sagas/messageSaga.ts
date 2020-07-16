/*
 * @Author: your name
 * @Date: 2020-05-22 15:45:35
 * @LastEditTime: 2020-05-27 19:47:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/sagas/messageSaga.ts
 */
import { take, call, put, select } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { get, post } from "../../utils/fetch"
import {
  FetchMessage,
  FetchOldMessage,
  PostMessage,
  ConstantTypes as MessageConstantTypes,
  StateType as MessageStateType,
  Message,
  actionFns as messageFns,
} from "../modules/message"

import { actionFns as channelFns } from "../modules/channel"
import { actionFns as scrollFns } from "../modules/scroll"

import { RootState } from "../configStore"

function processMessage(rawData: Message[]) {
  let messageData: MessageStateType = {}
  let messageIds: number[] = []
  rawData.forEach((msg) => {
    messageData[msg.uid.toString()] = msg
    messageIds.push(msg.uid)
  })
  return { messageData, messageIds }
}

export function* fetchMessage() {
  while (true) {
    const request: FetchMessage = yield take(MessageConstantTypes.FETCH_MESSAGE)
    const limit = 20
    const { channelId } = request
    // if msgFetched, then is fetchNewestMsg
    const msgFetched = yield select(
      (state: RootState) => state.info.channel[channelId.toString()].msgFetched
    )
    // set lastMessageId if msgFetched
    let lastMessageId
    if (msgFetched) {
      const messageIds = yield select(
        (state: RootState) =>
          state.info.channel[channelId.toString()].messageIds
      )
      lastMessageId = messageIds[0]
    }

    const response: AxiosResponse<{
      data: Message[]
      type: number
      method: string
    }> = yield call(
      get,
      `message?channelId=${channelId}&limit=${limit}&lastMessageId=${lastMessageId}`
    )
    if (response.data.type === 0) {
      const { messageData, messageIds } = yield call(
        processMessage,
        response.data.data
      )
      let moreMessage = limit === messageIds.length
      let channelData = {
        messageIds,
        moreMessage,
      }
      if (response.data.data[0]) {
        yield put(messageFns.fetchSuccess(messageData))
      }
      yield put(channelFns.initialFetchMessageSucess(channelData, channelId))
      yield put(scrollFns.setScroll())
    } else {
      console.log("error")
    }
  }
}

export function* fetchOldMessage() {
  while (true) {
    const request: FetchOldMessage = yield take(
      MessageConstantTypes.FETCH_OLD_MESSAGE
    )
    const limit = 20
    const { channelId, oldScrollHeight } = request
    const messageIds = yield select(
      (state: RootState) => state.info.channel[channelId.toString()].messageIds
    )
    const msgOffset = messageIds.length
    const response: AxiosResponse<{
      data: Message[]
      type: number
      method: string
    }> = yield call(
      get,
      `message?channelId=${channelId}&limit=${limit}&offset=${msgOffset}`
    )
    if (response.data.type === 0) {
      const { messageData, messageIds } = yield call(
        processMessage,
        response.data.data
      )
      let moreMessage = limit === messageIds.length
      let channelData = {
        messageIds,
        moreMessage,
      }
      if (response.data.data[0]) {
        yield put(messageFns.fetchSuccess(messageData))
      }
      yield put(channelFns.initialFetchMessageSucess(channelData, channelId))
      yield put(scrollFns.setScroll(oldScrollHeight))
    } else {
      console.log("error")
    }
  }
}

export function* postMessage() {
  while (true) {
    const request: PostMessage = yield take(MessageConstantTypes.POST_MESSAGE)
    const { content, userId, parentId } = request
    // const response: AxiosResponse<{ data: Message[], type: number }> =
     const response = yield call(post, `message`, {
      content,
      userId,
      parentId,
    })
    if (response.data.type === 0) {
      console.log("msg post success")
    }
  }
}
