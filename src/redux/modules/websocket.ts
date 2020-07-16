import update from 'immutability-helper'

export enum ConstantTypes {
  WS_CHANGE_CONNECT_STATE = 'WS_CHANGE_CONNECT_STATE',
  WS_CHANGE_CURRENT_CHANNEL = 'WS_CHANGE_CURRENT_CHANNEL', //saga
  WS_CHANGE_CURRENT_GUILD = 'WS_CHANGE_CURRENT_GUILD', //saga
  WS_CHANGE_CURRENT_ID = 'WS_CHANGE_CURRENT_ID',
  WS_SET_ROOM_ID = 'WS_SET_ROOM_ID',
  WS_SET_ONLINE_USERS = 'WS_SET_ONLINE_USERS',
  WS_SET_USERS_POSITION = 'WS_SET_USERS_POSITION',
}

export type ChangeConnectState = {
  type: ConstantTypes.WS_CHANGE_CONNECT_STATE,
  connected: boolean
}

export type ChangeCurrentChannel = {
  type: ConstantTypes.WS_CHANGE_CURRENT_CHANNEL,
  channelId: number,
  guildId: number
}

export type ChangeCurrentGuild = {
  type: ConstantTypes.WS_CHANGE_CURRENT_GUILD,
  guildId: number
}

export type ChangeCurrentId = {
  type: ConstantTypes.WS_CHANGE_CURRENT_ID,
  id: number
}

export type SetRoomId = {
  type: ConstantTypes.WS_SET_ROOM_ID,
  id: number[]
}

export type SetOnlineUser = {
  type: ConstantTypes.WS_SET_ONLINE_USERS,
  guildId: number,
  userIds: number[]
}

export type UsersPositionInGuildType = {
  [prop: string]: number[]
}

export type SetUsersPosition = {
  type: ConstantTypes.WS_SET_USERS_POSITION,
  usersPositionInGuild: UsersPositionInGuildType
}

type Actions =
  ChangeConnectState |
  ChangeCurrentId |
  SetRoomId |
  SetOnlineUser |
  SetUsersPosition

export const actionFns = {
  changeConnectState: (connected: boolean): ChangeConnectState => {
    return {
      type: ConstantTypes.WS_CHANGE_CONNECT_STATE,
      connected
    }
  },
  changeCurrentChannel: (channelId: number, guildId: number): ChangeCurrentChannel => {
    return {
      type: ConstantTypes.WS_CHANGE_CURRENT_CHANNEL,
      channelId,
      guildId
    }
  },
  changeCurrentGuild: (guildId: number): ChangeCurrentGuild => {
    return {
      type: ConstantTypes.WS_CHANGE_CURRENT_GUILD,
      guildId
    }
  },
  changeCurrentId: (id: number): ChangeCurrentId => {
    return {
      type: ConstantTypes.WS_CHANGE_CURRENT_ID,
      id
    }
  },
  setRoomId: (id: number[]): SetRoomId => {
    return {
      type: ConstantTypes.WS_SET_ROOM_ID,
      id
    }
  },
  setOnlineUser: (guildId: number, userIds: number[]): SetOnlineUser => {
    return {
      type: ConstantTypes.WS_SET_ONLINE_USERS,
      guildId,
      userIds
    }
  },
  setUsersPosition: (usersPositionInGuild: UsersPositionInGuildType): SetUsersPosition => {
    return {
      type: ConstantTypes.WS_SET_USERS_POSITION,
      usersPositionInGuild
    }
  }
}

export type StateType = {
  connected: boolean,
  roomIds: number[],
  currentId: number,
  onlineUsers: {
    [guildId: string]: number[]
  },
  usersPositionInGuild: UsersPositionInGuildType
}

const initialState: StateType = {
  connected: false,
  roomIds: [],
  currentId: 0,
  onlineUsers: {},
  usersPositionInGuild: {}
}

export function reducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ConstantTypes.WS_CHANGE_CONNECT_STATE:
      return update(state, {
        connected: {
          $set: action.connected
        }
      })
    case ConstantTypes.WS_CHANGE_CURRENT_ID:
      return update(state, {
        currentId: {
          $set: action.id
        }
      })
    case ConstantTypes.WS_SET_ROOM_ID:
      return update(state, {
        roomIds: {
          $set: action.id
        }
      })
    case ConstantTypes.WS_SET_ONLINE_USERS:
      return update(state, {
        onlineUsers: {
          [action.guildId.toString()]: {
            $set: action.userIds
          }
        }
      })
    case ConstantTypes.WS_SET_USERS_POSITION:
      return update(state, {
        usersPositionInGuild: {
          $set: action.usersPositionInGuild
        }
      })
    default:
      return state
  }
}