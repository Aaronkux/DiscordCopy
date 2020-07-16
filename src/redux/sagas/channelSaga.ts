import { take, call, put } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { post } from '../../utils/fetch'

import {
  ConstantTypes as ChannelConstantTypes,
  AddChannel,
  Channel,
  StateType as ChannelStateType,
  actionFns as channelFns
} from '../modules/channel'

import { actionFns as guildFns } from '../modules/guild'
import { actionFns as topLayerFns } from '../modules/topLayerStatus'

import { message } from 'antd'


export function* createChannel() {
  while (true) {
    const request: AddChannel = yield take(ChannelConstantTypes.ADD_CHANNEL_START)
    const { name, parentId, guildId, channelType: type } = request;
    const response: AxiosResponse<{ type: number, code: number, data: Channel }> = yield call(post, 'channel', {
      name,
      type,
      parentId: parentId === 0 ? null : parentId,
      guildId
    })
    if (response.data.type === 0) {
      const { uid, guildId } = response.data.data
      let channelData: ChannelStateType = {}
      channelData[uid.toString()] = response.data.data
      yield put(channelFns.updateChannel(channelData))
      yield put(guildFns.addChannelToGuild(guildId, uid))
      yield put(topLayerFns.toggleNewChannelLayer())
      message.success('添加成功', 3)
    }
  }
}