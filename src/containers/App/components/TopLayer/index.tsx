import React, { Fragment } from 'react'
import Cover from '../../../../components/Cover'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../redux/configStore'
import SelectNewOrJoin from './components/SelectNewOrJoin'
import GuildSetting from './components/GuildSetting'
import UserSetting from './components/UserSetting'
import NewChannel from './components/NewChannel'

import { actionFns as topLayerFns } from '../../../../redux/modules/topLayerStatus'

export default function TopLayer() {
  const topLayerState = useSelector((state: RootState) => state.topLayerStatus)
  
  return (
    <Fragment>
      <Cover hidden={!topLayerState.showNewOrJoinLayer} handleClick={topLayerFns.toggleNewOrJoinLayer} >
        {!topLayerState.showNewOrJoinLayer ? '' :
          <SelectNewOrJoin />
        }
      </Cover>
      <Cover hidden={!topLayerState.showNewChannelLayer} handleClick={topLayerFns.toggleNewChannelLayer} >
        {!topLayerState.showNewChannelLayer ? '' :
          <NewChannel />
        }
      </Cover>
      {topLayerState.showGuildSettingLayer ?
        <GuildSetting guildId={topLayerState.settingGuildId} hidden={!topLayerState.showGuildSettingLayer} />
        : ''}
      {topLayerState.showUserSettingLayer ?
        <UserSetting hidden={!topLayerState.showUserSettingLayer} />
        : ''}
    </Fragment>
  )
}
