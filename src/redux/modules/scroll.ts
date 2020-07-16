import update from "immutability-helper"
export enum ConstantTypes {
  SET_SCROLL = "SET_SCROLL",
  CANCEL_SCROLL = "CANCEL_SCROLL",
  // SET_OLD_HEIGHT = "SET_OLD_HEIGHT",
  SET_IS_AT_BOTTOM = 'SET_IS_AT_BOTTOM'
}

export type SetScroll = {
  type: ConstantTypes.SET_SCROLL,
  oldScrollHeight?: number
}

export type CancelScroll = {
  type: ConstantTypes.CANCEL_SCROLL
}

// export type SetOldHeight = {
//   type: ConstantTypes.SET_OLD_HEIGHT
//   height: number
// }

export type SetIsAtBottom = {
  type: ConstantTypes.SET_IS_AT_BOTTOM
  isAtBottom: boolean
}

type Actions = SetScroll | CancelScroll  | SetIsAtBottom

export const actionFns = {
  setScroll: (oldScrollHeight?: number): SetScroll => {
    return {
      type: ConstantTypes.SET_SCROLL,
      oldScrollHeight
    }
  },
  cancelScroll: (): CancelScroll => {
    return {
      type: ConstantTypes.CANCEL_SCROLL,
    }
  },
  // setOldHeight: (height: number): SetOldHeight => {
  //   return {
  //     type: ConstantTypes.SET_OLD_HEIGHT,
  //     height
  //   }
  // },
  setIsAtBottom: (isAtBottom: boolean): SetIsAtBottom => {
    return {
      type: ConstantTypes.SET_IS_AT_BOTTOM,
      isAtBottom
    }
  }
}

type StateType = {
  needScroll: boolean
  // oldScrollHeight = Infinity = toBottom    oldScrollHeight != Infinity scroll newScrollHeight - oldScrollHeight
  oldScrollHeight: number
  isAtBottom: boolean
}

const initialState: StateType = {
  needScroll: false,
  oldScrollHeight: Infinity,
  isAtBottom: true
}

export function reducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ConstantTypes.SET_SCROLL:
      return update(state, {
        needScroll: {
          $set: true,
        },
        oldScrollHeight: {
          $set: action.oldScrollHeight || state.oldScrollHeight
        }
      })
    case ConstantTypes.CANCEL_SCROLL:
      return update(state, {
        needScroll: {
          $set: false,
        },
        oldScrollHeight: {
          $set: Infinity,
        },
      })
    // case ConstantTypes.SET_OLD_HEIGHT:
    //   return update(state, {
    //     oldScrollHeight: {
    //       $set: action.height,
    //     }
    //   })
    case ConstantTypes.SET_IS_AT_BOTTOM:
      return update(state, {
        isAtBottom: {
          $set: action.isAtBottom
        }
      })
    default:
      return state
  }
}
