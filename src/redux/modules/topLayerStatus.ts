import update from 'immutability-helper'

export enum ConstantTypes {
  TOGGLE_USER_SETTING_LAYER = 'TOGGLE_USER_SETTING_LAYER',
  TOGGLE_GUILD_SETTING_LAYER = 'TOGGLE_GUILD_SETTING_LAYER',
  TOGGLE_NEWORJOIN_LAYER = 'TOGGLE_NEWORJOIN_LAYER',
  TOGGLE_NEWCHANNEL_LAYER = 'TOGGLE_NEWCHANNEL_LAYER',
  CHANGE_GUILDID = 'CHANGE_GUILDID',
  UPDATE_COTEXT_MENU = 'UPDATE_COTEXT_MENU'
}

export type ToggleUserSettingLayerType = {
  type: ConstantTypes.TOGGLE_USER_SETTING_LAYER
}
export type ToggleGuildSettingLayerType = {
  type: ConstantTypes.TOGGLE_GUILD_SETTING_LAYER
}
export type ToggleNewOrJoinLayerType = {
  type: ConstantTypes.TOGGLE_NEWORJOIN_LAYER
}

export type ChangeGuildId = {
  type: ConstantTypes.CHANGE_GUILDID,
  guildId: number
}

export type UpdateContextMenu = {
  type: ConstantTypes.UPDATE_COTEXT_MENU,
  guildOrChannel: number,
  x: number,
  y: number,
  guildId?: number,
  parentId?: number
}

export type ToogleNewChannelLayerType = {
  type: ConstantTypes.TOGGLE_NEWCHANNEL_LAYER,
}

type Actions =
  ToggleUserSettingLayerType |
  ToggleGuildSettingLayerType |
  ToggleNewOrJoinLayerType |
  ChangeGuildId |
  UpdateContextMenu |
  ToogleNewChannelLayerType

export const actionFns = {
  toggleUserSettingLayer: (): ToggleUserSettingLayerType => {
    return {
      type: ConstantTypes.TOGGLE_USER_SETTING_LAYER
    }
  },
  toggleGuildSettingLayer: (): ToggleGuildSettingLayerType => {
    return {
      type: ConstantTypes.TOGGLE_GUILD_SETTING_LAYER,
    }
  },
  toggleNewOrJoinLayer: (): ToggleNewOrJoinLayerType => {
    return {
      type: ConstantTypes.TOGGLE_NEWORJOIN_LAYER
    }
  },
  toggleNewChannelLayer: (): ToogleNewChannelLayerType => {
    return {
      type: ConstantTypes.TOGGLE_NEWCHANNEL_LAYER
    }
  },
  changeGuildId: (guildId: number): ChangeGuildId => {
    return {
      type: ConstantTypes.CHANGE_GUILDID,
      guildId
    }
  },
  udateContextMenu: (x: number, y: number, guildOrChannel: number, guildId?: number, parentId?: number): UpdateContextMenu => {
    return {
      type: ConstantTypes.UPDATE_COTEXT_MENU,
      guildOrChannel,
      x,
      y,
      guildId,
      parentId
    }
  }
}

type StateType = {
  showUserSettingLayer: boolean,
  showGuildSettingLayer: boolean,
  showNewOrJoinLayer: boolean,
  showNewChannelLayer: boolean,
  settingGuildId: number,
  guildOrChannel: number,
  x: number,
  y: number,
  parentId: number,
  guildId: number
}

const initialState: StateType = {
  showUserSettingLayer: false,
  showGuildSettingLayer: false,
  showNewOrJoinLayer: false,
  showNewChannelLayer: false,
  settingGuildId: 0,
  //1:guildContextMenu 2:channelContextMenu 0: notshow
  guildOrChannel: 0,
  // position of ContextMenu
  x: 0,
  y: 0,
  parentId: 0,
  guildId: 0
}

export function reducer(state = initialState, action: Actions) {
  switch (action.type) {
    case ConstantTypes.TOGGLE_USER_SETTING_LAYER:
      return update(state, {
        showUserSettingLayer: {
          $set: !state.showUserSettingLayer
        }
      })
    case ConstantTypes.TOGGLE_GUILD_SETTING_LAYER:
      return update(state, {
        showGuildSettingLayer: {
          $set: !state.showGuildSettingLayer
        }
      })
    case ConstantTypes.TOGGLE_NEWORJOIN_LAYER:
      return update(state, {
        showNewOrJoinLayer: {
          $set: !state.showNewOrJoinLayer
        }
      })
    case ConstantTypes.TOGGLE_NEWCHANNEL_LAYER:
      return update(state, {
        showNewChannelLayer: {
          $set: !state.showNewChannelLayer
        }
      })
    case ConstantTypes.CHANGE_GUILDID:
      return update(state, {
        settingGuildId: {
          $set: action.guildId
        }
      })
    case ConstantTypes.UPDATE_COTEXT_MENU:
      return update(state, {
        guildOrChannel: {
          $set: action.guildOrChannel
        },
        x: {
          $set: action.x
        },
        y: {
          $set: action.y
        },
        guildId: {
          $set: action.guildId !== undefined ? action.guildId : state.guildId
        },
        parentId: {
          $set: action.parentId !== undefined ? action.parentId : state.parentId
        }
      })
    default:
      return state
  }
}