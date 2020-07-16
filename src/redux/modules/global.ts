/*
 * @Author: your name
 * @Date: 2020-05-20 08:10:29
 * @LastEditTime: 2020-05-20 21:35:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/modules/current.ts
 */
import update from 'immutability-helper'
/**
 * constant
 */
export enum ConstantTypes {
  FETCH_SIGNAL = 'FETCH_SIGNAL', //saga
  FETCH_START = 'FETCH_START',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  FETCH_ERROR = 'FETCH_ERROR',
  CHANGE_CURRENT_GUILD = 'CHANGE_CURRENT_GUILD',
  CHANGE_CURRENT_CHANNEL = 'CHANGE_CURRENT_CHANNEL',
}

/**
 * action type
 */

export type FetchStart = {
  type: ConstantTypes.FETCH_START
}

export type FetchSuccess = {
  type: ConstantTypes.FETCH_SUCCESS
}

export type FetchError = {
  type: ConstantTypes.FETCH_ERROR
}

export type ChangeCurrentGuild = {
  type: ConstantTypes.CHANGE_CURRENT_GUILD,
  guildId: number
}

export type ChangeCurrentChannel = {
  type: ConstantTypes.CHANGE_CURRENT_CHANNEL,
  channelId: number
}

/**
 * reducer actions
 */
type ActionTypes =
  FetchStart |
  FetchSuccess |
  FetchError |
  ChangeCurrentGuild |
  ChangeCurrentChannel

/**
 * action functions
 */
export const actionFns = {
  changeCurrentGuild: (guildId: number): ChangeCurrentGuild => {
    return {
      type: ConstantTypes.CHANGE_CURRENT_GUILD,
      guildId
    }
  },
  changeCurrentChannel: (channelId: number): ChangeCurrentChannel => {
    return {
      type: ConstantTypes.CHANGE_CURRENT_CHANNEL,
      channelId
    }
  }
}

type StateType = {
  currentGuildId?: number,
  currentChannelId?: number,
  isFetching: boolean,
  isInitialized: boolean,
  isError: boolean
}

const initialState: StateType = {
  isFetching: false,
  isInitialized: false,
  isError: false
}

export function reducer(state = initialState, action: ActionTypes) {
  switch (action.type) {
    case ConstantTypes.FETCH_START:
      return update(state, {
        isFetching: {
          $set: true
        }
      })
    case ConstantTypes.FETCH_SUCCESS:
      return update(state, {
        isFetching: {
          $set: false
        },
        isInitialized: {
          $set: true
        }
      })
    case ConstantTypes.FETCH_ERROR:
      return update(state, {
        isFetching: {
          $set: false
        },
        isError: {
          $set: true
        }
      })
    case ConstantTypes.CHANGE_CURRENT_GUILD:
      return update(state, {
        currentGuildId: {
          $set: action.guildId
        }
      })
    case ConstantTypes.CHANGE_CURRENT_CHANNEL:
      return update(state, {
        currentChannelId: {
          $set: action.channelId
        }
      })

    default:
      return state
  }
}

