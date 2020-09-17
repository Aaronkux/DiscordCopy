/*
 * @Author: your name
 * @Date: 2020-05-22 22:12:35
 * @LastEditTime: 2020-05-22 22:28:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/modules/member.ts
 */
import update from 'immutability-helper'

export enum ConstantTypes {
  INITIAL_MEMBER = 'INITIAL_MEMBER',
  UPDATE_MEMBER = 'UPDATE_MEMBER'
}

export type InitialMemberType = {
  type: ConstantTypes.INITIAL_MEMBER,
  memberData: StateType
}

export type UpdateMemberType = {
  type: ConstantTypes.UPDATE_MEMBER,
  uid: number,
  name: string,
  avatar: string
}

type Actions =
  InitialMemberType |
  UpdateMemberType

export const actionFns = {
  initialMember: (memberData: StateType): InitialMemberType => {
    return {
      type: ConstantTypes.INITIAL_MEMBER,
      memberData
    }
  },
  updateMember: (uid: number, name: string, avatar: string): UpdateMemberType => {
    return {
      type: ConstantTypes.UPDATE_MEMBER,
      uid,
      name,
      avatar
    }
  }
}

export type Member = {
  uid: number,
  name: string,
  avatar: string
}

export type StateType = {
  [prop: string]: Member
}

export function reducer(state: StateType = {}, action: Actions) {
  switch (action.type) {
    case ConstantTypes.INITIAL_MEMBER:
      return update(state, {
        $merge: action.memberData
      })
    case ConstantTypes.UPDATE_MEMBER:
      return update(state, {
        [action.uid.toString()]: {
          name: {
            $set: action.name
          },
          avatar: {
            $set: action.avatar
          }
        }
      })
    default:
      return state
  }
}