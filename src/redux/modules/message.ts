/*
 * @Author: your name
 * @Date: 2020-05-22 15:07:22
 * @LastEditTime: 2020-05-27 18:45:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/modules/message.ts
 */
import update from 'immutability-helper'

export enum ConstantTypes {
  FETCH_MESSAGE = 'FETCH_MESSAGE',
  FETCH_OLD_MESSAGE = 'FETCH_OLD_MESSAGE',
  UPDATE_MESSAGE = 'UPDATE_MESSAGE',
  POST_MESSAGE = 'POST_MESSAGE', //saga
}

//add a attribute needScroll and use it in msgSaga to decide whether to dispatch a setScroll fn after fetch
export type FetchMessage = {
  type: ConstantTypes.FETCH_MESSAGE,
  channelId: number
}

export type FetchOldMessage = {
  type: ConstantTypes.FETCH_OLD_MESSAGE,
  channelId: number,
  oldScrollHeight: number
}

export type FetchSuccess = {
  type: ConstantTypes.UPDATE_MESSAGE,
  data: StateType
}

export type PostMessage = {
  type: ConstantTypes.POST_MESSAGE,
  content: string,
  userId: number,
  parentId: number
}

type Actions =
  FetchSuccess


export const actionFns = {
  fetchMessage: (channelId: number): FetchMessage => {
    return {
      type: ConstantTypes.FETCH_MESSAGE,
      channelId
    }
  },
  fetchOldMessage: (channelId: number,oldScrollHeight: number): FetchOldMessage => {
    return {
      type: ConstantTypes.FETCH_OLD_MESSAGE,
      channelId,
      oldScrollHeight
    }
  },
  fetchSuccess: (data: StateType): FetchSuccess => {
    return {
      type: ConstantTypes.UPDATE_MESSAGE,
      data
    }
  },
  postMessage: (content: string, userId: number, parentId: number): PostMessage => {
    return {
      type: ConstantTypes.POST_MESSAGE,
      content,
      userId,
      parentId
    }
  }
}

export type Message = {
  content: string,
  parentId: number,
  owner: number,
  uid: number,
  createdAt: string
}

export type StateType = {
  [prop: string]: Message
}

export function reducer(state: StateType = {}, action: Actions) {
  switch (action.type) {
    case ConstantTypes.UPDATE_MESSAGE:
      return update(state, {
        $merge: action.data
      })
    default:
      return state
  }
}