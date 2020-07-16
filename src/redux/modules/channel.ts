/*
 * @Author: your name
 * @Date: 2020-05-04 11:59:45
 * @LastEditTime: 2020-05-26 21:08:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/modules/channel.ts
 */
import update from "immutability-helper"

/**
 * constant type
 */
export enum ConstantTypes {
  FETCH_CHANNEL = "FETCH_CHANNEL",
  UPDATE_CHANNEL = "UPDATE_CHANNEL",
  ADD_CHANNEL_START = "ADD_CHANNEL_START",
  // DELETE_CHANNEL = 'DELETE_CHANNEL',
  UPDATE_VALID_STATE = "UPDATE_VALID_STATE",
  MSG_NOT_VALID = 'MSG_NOT_VALID',
  INITIAL_FETCH_MESSAGE_SUCCESS = "INITIAL_FETCH_MESSAGE_SUCCESS",
  UPDATE_FETCH_MESSAGE_SUCCESS = "UPDATE_FETCH_MESSAGE_SUCCESS",
}

/**
 * action type
 */

export type UpdateChannel = {
  type: ConstantTypes.UPDATE_CHANNEL
  channel: StateType
}

export type UpdateValidStateType = {
  type: ConstantTypes.UPDATE_VALID_STATE
  uid: number
}

export type AddChannel = {
  type: ConstantTypes.ADD_CHANNEL_START
  name: string
  parentId: number
  channelType: number
  guildId: number
}

export type InitialFetchMessageSucess = {
  type: ConstantTypes.INITIAL_FETCH_MESSAGE_SUCCESS
  data: Pick<Channel, "messageIds" | "moreMessage">
  uid: number
}

export type UpdateFetchMessageSucess = {
  type: ConstantTypes.UPDATE_FETCH_MESSAGE_SUCCESS
  messageIds: number[]
  uid: number
}

export type MsgNotValid = {
  type: ConstantTypes.MSG_NOT_VALID,
}

type ActionTypes =
  | UpdateChannel
  | UpdateValidStateType
  | InitialFetchMessageSucess
  | UpdateFetchMessageSucess
  | MsgNotValid

export const actionFns = {
  updateChannel: (channel: StateType): UpdateChannel => {
    return {
      type: ConstantTypes.UPDATE_CHANNEL,
      channel,
    }
  },
  updateValidState: (uid: number): UpdateValidStateType => {
    return {
      type: ConstantTypes.UPDATE_VALID_STATE,
      uid,
    }
  },
  msgNotValid: ():MsgNotValid => {
    return {
      type: ConstantTypes.MSG_NOT_VALID
    }
  },
  addChannel: (
    name: string,
    channelType: number,
    guildId: number,
    parentId: number
  ): AddChannel => {
    return {
      type: ConstantTypes.ADD_CHANNEL_START,
      name,
      channelType,
      guildId,
      parentId,
    }
  },
  initialFetchMessageSucess: (
    data: Pick<Channel, "messageIds" | "moreMessage">,
    uid: number
  ): InitialFetchMessageSucess => {
    return {
      type: ConstantTypes.INITIAL_FETCH_MESSAGE_SUCCESS,
      data,
      uid,
    }
  },
  updateFetchMessageSucess: (
    messageIds: number[],
    uid: number
  ): UpdateFetchMessageSucess => {
    return {
      type: ConstantTypes.UPDATE_FETCH_MESSAGE_SUCCESS,
      messageIds,
      uid,
    }
  },
}

export type Channel = {
  name: string
  channelType: number
  position: number
  uid: number
  parentId: number
  guildId: number
  messageIds: number[]
  moreMessage: boolean
  isValid: boolean
  msgFetched: boolean
}
export type StateType = {
  [prop: string]: Channel
}

export function reducer(state: StateType = {}, action: ActionTypes) {
  switch (action.type) {
    case ConstantTypes.UPDATE_CHANNEL:
      return update(state, {
        $merge: action.channel,
      })
    case ConstantTypes.MSG_NOT_VALID:
      for (let channel of Object.values(state)) {
        channel.isValid = false
      }
      return state
    case ConstantTypes.UPDATE_VALID_STATE:
      return update(state, {
        [action.uid.toString()]: {
          isValid: {
            $set: false,
          },
        },
      })
    //msg add from end
    case ConstantTypes.INITIAL_FETCH_MESSAGE_SUCCESS:
      return update(state, {
        [action.uid.toString()]: {
          messageIds: {
            $push: action.data.messageIds,
          },
          isValid: {
            $set: true,
          },
          moreMessage: {
            $set: action.data.moreMessage,
          },
          msgFetched: {
            $set: true,
          },
        },
      })
    case ConstantTypes.UPDATE_FETCH_MESSAGE_SUCCESS:
      return update(state, {
        [action.uid.toString()]: {
          messageIds: {
            $push: action.messageIds,
          },
          isValid: {
            $set: true,
          }
        }
      })
    default:
      return state
  }
}
