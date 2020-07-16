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
  INITIAL_MEMBER = 'INITIAL_MEMBER'
}

export type InitialMemberType = {
  type: ConstantTypes.INITIAL_MEMBER,
  memberData: StateType
}

type Actions =
  InitialMemberType

export const actionFns = {
  initialMember: (memberData: StateType): InitialMemberType => {
    return {
      type: ConstantTypes.INITIAL_MEMBER,
      memberData
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
    default:
      return state
  }
}