import update from "immutability-helper"

export enum ConstantTypes {
  CREATE_LINK = "CREATE_LINK",
  GET_LINK = "GET_LINK",
  DELETE_LINK = "DELETE_LINK",
  JOIN_LINK = "JOIN_LINK",
  ADD_LINK = "ADD_LINK",
}

export type CreatLink = {
  type: ConstantTypes.CREATE_LINK
  guildId: number
  slots: number
}

export type GetLink = {
  type: ConstantTypes.GET_LINK
  guildId: number
}

export type JoinLink = {
  type: ConstantTypes.JOIN_LINK
  linkCode: string
}

export type AddLink = {
  type: ConstantTypes.ADD_LINK
  data: StateType
}

type ActionTypes = AddLink

export const actionFns = {
  joinLink: (linkCode: string): JoinLink => {
    return {
      type: ConstantTypes.JOIN_LINK,
      linkCode,
    }
  },
  getLink: (guildId: number): GetLink => {
    return {
      type: ConstantTypes.GET_LINK,
      guildId,
    }
  },
  createLink: (guildId: number, slots: number): CreatLink => {
    return {
      type: ConstantTypes.CREATE_LINK,
      guildId,
      slots,
    }
  },
  addLink: (data: StateType): AddLink => {
    return {
      type: ConstantTypes.ADD_LINK,
      data,
    }
  },
}

export type Link = {
  userId: number
  link: string
  guildId: number
  slots: number
  id: number
}

export type StateType = {
  [prop: string]: Link
}

export function reducer(state: StateType = {}, action: ActionTypes) {
  switch (action.type) {
    case ConstantTypes.ADD_LINK:
      return update(state, {
        $merge: action.data,
      })

    default:
      return state
  }
}
