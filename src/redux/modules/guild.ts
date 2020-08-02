import update from "immutability-helper"
/**
 * constant types
 */
export enum ConstantTypes {
  FETCH_GUILD = "FETCH_GUILD",
  UPDATE_GUILD = "UPDATE_GUILD",
  ADD_GUILD = "ADD_GUILD",
  DELETE_GUILD = "DELETE_GUILD",
  PATCH_GUILD_START = "PATCH_GUILD_START",
  PATCH_GUILD_SUCCEED = "PATCH_GUILD_SUCCEED",
  ADD_CHANNEL_TO_GUILD = "ADD_CHANNEL_TO_GUILD",
}

/**
 * action type
 */

export type FetchGuild = {
  type: ConstantTypes.FETCH_GUILD
  guildUid: number
  localChangeTime: string
}

export type UpdateGuild = {
  type: ConstantTypes.UPDATE_GUILD
  guildData: StateType
}

export type AddGuild = {
  type: ConstantTypes.ADD_GUILD
  name: string
  file?: File
}

export type PatchGuild = {
  type: ConstantTypes.PATCH_GUILD_START
  guildId: number
  name: string
  file?: File
}

export type PatchGuildSucceed = {
  type: ConstantTypes.PATCH_GUILD_SUCCEED
  uid: number
  changeTime: string
  avatar: string
  name: string
}

export type AddChannelToGuild = {
  type: ConstantTypes.ADD_CHANNEL_TO_GUILD
  guildId: number
  channelId: number
}

type ActionTypes = UpdateGuild | PatchGuildSucceed | AddChannelToGuild

export const actionFns = {
  fetchGuild: (guildUid: number, localChangeTime: string): FetchGuild => {
    return {
      type: ConstantTypes.FETCH_GUILD,
      guildUid,
      localChangeTime,
    }
  },
  updateGuild: (guildData: StateType): UpdateGuild => {
    return {
      type: ConstantTypes.UPDATE_GUILD,
      guildData,
    }
  },
  addGuild: (name: string, file?: File): AddGuild => {
    return {
      type: ConstantTypes.ADD_GUILD,
      name,
      file,
    }
  },
  patchGuild: (guildId: number, name: string, file?: File): PatchGuild => {
    return {
      type: ConstantTypes.PATCH_GUILD_START,
      guildId,
      name,
      file,
    }
  },
  patchGuildSucceed: (
    uid: number,
    changeTime: string,
    avatar: string,
    name: string
  ): PatchGuildSucceed => {
    return {
      type: ConstantTypes.PATCH_GUILD_SUCCEED,
      uid,
      changeTime,
      avatar,
      name,
    }
  },
  addChannelToGuild: (
    guildId: number,
    channelId: number
  ): AddChannelToGuild => {
    return {
      type: ConstantTypes.ADD_CHANNEL_TO_GUILD,
      guildId,
      channelId,
    }
  },
}
/**
 * state type
 */
export type Guild = {
  name: string
  uid: number
  owner: number
  avatar: string
  changeTime: string
  channelsUids: number[]
  usersUids: number[]
}

export type StateType = {
  [prop: string]: Guild
}

export function reducer(state: StateType = {}, action: ActionTypes) {
  switch (action.type) {
    case ConstantTypes.UPDATE_GUILD:
      return update(state, {
        $merge: action.guildData,
      })
    case ConstantTypes.PATCH_GUILD_SUCCEED:
      return update(state, {
        [action.uid.toString()]: {
          name: {
            $set: action.name,
          },
          avatar: {
            $set: action.avatar,
          },
          changeTime: {
            $set: action.changeTime,
          },
        },
      })
    case ConstantTypes.ADD_CHANNEL_TO_GUILD:
      return update(state, {
        [action.guildId.toString()]: {
          channelsUids: {
            $push: [action.channelId],
          },
        },
      })
    default:
      return state
  }
}
