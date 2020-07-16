/*
 * @Author: your name
 * @Date: 2020-05-15 16:10:29
 * @LastEditTime: 2020-05-15 18:38:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/modules/user.ts
 */
import update from "immutability-helper"

export enum ConstantTypes {
  LOGIN_START = "LOGIN_START", //saga
  TOKEN_AUTH = "TOKEN_AUTH", //saga
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  PATCH_USER = "PATCH_USER",
  PATCH_USER_SUCCESS = "PATCH_USER_SUCCESS",
}

export type LoginStartType = {
  type: ConstantTypes.LOGIN_START
  username: string
  password: string
}

export type LoginSuccessType = {
  type: ConstantTypes.LOGIN_SUCCESS
  name: string
  avatar: string
  uid: number
}
export type LoginFailureType = {
  type: ConstantTypes.LOGIN_FAILURE
  msg: string
}

export type TokenExpiredType = {
  type: ConstantTypes.TOKEN_EXPIRED
}

export type PatchUserType = {
  type: ConstantTypes.PATCH_USER
  name: string
  file?: File
}

export type PatchUserSuccessType = {
  type: ConstantTypes.PATCH_USER_SUCCESS
  name: string
  avatar: string
}

type Actions =
  | LoginStartType
  | LoginSuccessType
  | LoginFailureType
  | TokenExpiredType
  | PatchUserSuccessType

export const actionFns = {
  loginStart: (username: string, password: string): LoginStartType => {
    return {
      type: ConstantTypes.LOGIN_START,
      username,
      password,
    }
  },
  loginSuccess: ({
    name,
    avatar,
    uid,
  }: {
    name: string
    avatar: string
    uid: number
  }): LoginSuccessType => {
    return {
      type: ConstantTypes.LOGIN_SUCCESS,
      name,
      avatar,
      uid,
    }
  },
  loginFailure: (msg: string): LoginFailureType => {
    return {
      type: ConstantTypes.LOGIN_FAILURE,
      msg,
    }
  },
  patchUser: (name: string, file?: File): PatchUserType => {
    return {
      type: ConstantTypes.PATCH_USER,
      name,
      file,
    }
  },
  patchUserSuccess: (name: string, avatar: string): PatchUserSuccessType => {
    return {
      type: ConstantTypes.PATCH_USER_SUCCESS,
      name,
      avatar,
    }
  },
}

export type StateType = {
  uid?: number
  name?: string
  avatar: string
  isValid?: boolean
  errorMsg?: string
}

const initialState: StateType = {
  avatar:
    "https://cdn.discordapp.com/avatars/278036884637351936/8c7ebea3b8d97acbda26f6619f9c365e.png?size=128",
}

export function reducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ConstantTypes.LOGIN_SUCCESS:
      return update(state, {
        uid: {
          $set: action.uid,
        },
        name: {
          $set: action.name,
        },
        avatar: {
          $set: action.avatar,
        },
        isValid: {
          $set: true,
        },
      })
    case ConstantTypes.TOKEN_EXPIRED:
      return update(state, {
        isValid: {
          $set: false,
        },
      })

    case ConstantTypes.LOGIN_FAILURE:
      return update(state, {
        isValid: {
          $set: false,
        },
        errorMsg: {
          $set: action.msg,
        },
      })
    case ConstantTypes.PATCH_USER_SUCCESS:
      return update(state, {
        avatar: {
          $set: action.avatar,
        },
        name: {
          $set: action.name,
        },
      })
    default:
      return state
  }
}
