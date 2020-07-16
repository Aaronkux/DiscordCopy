import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../redux/configStore'
import ChannelMenu from './components/ChannelMenu'


function ContextMenu() {
  const guildOrChannel = useSelector((state: RootState) => state.topLayerStatus.guildOrChannel)
  const x = useSelector((state: RootState) => state.topLayerStatus.x)
  const y = useSelector((state: RootState) => state.topLayerStatus.y)
  
  return (
    <Fragment>
      {
        guildOrChannel === 2 ?
          <ChannelMenu x={x} y={y} /> : ''
      }
    </Fragment>
  )
}

export default React.memo(ContextMenu)
