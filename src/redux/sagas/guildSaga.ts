import { take, call, put, select } from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import { get, post, patch } from '../../utils/fetch'
import { RootState } from '../configStore'
import {
  AddGuild,
  PatchGuild,
  FetchGuild,
  ConstantTypes as GuildConstantTypes,
  Guild,
  StateType as GuildStateType,
  actionFns as guildFns
} from '../modules/guild'

import {
  actionFns as channelFns,
  Channel,
  StateType as ChannelStateType
} from '../modules/channel'

import {
  actionFns as topLayerFns
} from '../modules/topLayerStatus'
import {
  StateType as MessageStateType,
  Member,
  actionFns as memberFns
} from '../modules/member'

import {
  ConstantTypes as GlobalConstantTypes,
} from '../modules/global'

import { message } from 'antd'

export function* initialFetch() {
  yield take(GlobalConstantTypes.FETCH_SIGNAL)
  yield put({ type: GlobalConstantTypes.FETCH_START })
  const userUid = yield select((state: RootState) => state.user.uid)
  const response: AxiosResponse<{
    type: number,
    code: number,
    data: {
      guilds: Guild[],
      users: Member[],
      channels: Channel[]
    }
  }> = yield call(get, `guild?userUid=${userUid}`)
  if (response.data.type === 0) {
    const { guilds, channels, users } = response.data.data
    let guildData: GuildStateType = {};
    let channelsData: ChannelStateType = {};
    let memberData: MessageStateType = {}
    guilds.forEach(guild => guildData[guild.uid.toString()] = guild)
    channels.forEach(channel => channelsData[channel.uid.toString()] = {...channel, moreMessage: false, isValid: false, msgFetched: false})
    users.forEach(user => memberData[user.uid.toString()] = user)
    yield put(memberFns.initialMember(memberData))
    yield put(guildFns.updateGuild(guildData))
    yield put(channelFns.updateChannel(channelsData))
    yield put({ type: GlobalConstantTypes.FETCH_SUCCESS })
  } else {
    yield put({ type: GlobalConstantTypes.FETCH_ERROR })
  }
}

export function* createGuild() {
  while (true) {
    const request: AddGuild = yield take(GuildConstantTypes.ADD_GUILD)
    const { name: username, uid: userId } = yield select((state: RootState) => state.user)
    let { name: guildName, file } = request
    guildName = guildName ? guildName : `${username}'s guild`
    let form = new FormData()
    if (file) form.append('file', file)
    form.set('name', guildName)
    form.set('userId', userId)
    const response: AxiosResponse<{
      type: number,
      code: number,
      data: {
        guilds: Guild[],
        users: Member[]
      }
    }> = yield call(post, 'guild', form)
    // console.log(username, uid)
    if (response.data.type === 0) {
      const { guilds, users } = response.data.data
      let guildData: GuildStateType = {};
      let memberData: MessageStateType = {}
      guilds.forEach(guild => guildData[guild.uid.toString()] = guild)
      users.forEach(user => memberData[user.uid.toString()] = user)
      yield put(memberFns.initialMember(memberData))
      yield put(guildFns.updateGuild(guildData))
      yield put(topLayerFns.toggleNewOrJoinLayer())
    }
  }
}

export function* patchGuild() {
  while (true) {
    const request: PatchGuild = yield take(GuildConstantTypes.PATCH_GUILD_START)
    let { name: guildName, file, guildId } = request
    let form = new FormData()
    if (file) form.append('file', file)
    form.set('name', guildName)
    form.set('guildId', guildId.toString())
    const response: AxiosResponse<{
      type: number,
      code: number,
      data: Pick<Guild, 'name' | 'changeTime' | 'uid' | 'avatar'>
    }> = yield call(patch, 'guild', form)
    if (response.data.type === 0) {
      const { uid, name, changeTime, avatar } = response.data.data
      yield put(guildFns.patchGuildSucceed(uid, changeTime, avatar, name))
      message.success('更新成功', 3)
    }

  }
}

export function* fetchGuild() {
  while (true) {
    const request: FetchGuild = yield take(GuildConstantTypes.FETCH_GUILD)
    const { guildUid, localChangeTime } = request
    const response: AxiosResponse<{
      type: number,
      code: number,
      data: {
        guilds: Guild[],
        users: Member[],
        channels: Channel[]
      }
    }> = yield call(get, `guild?guildUid=${guildUid}&localChangeTime=${localChangeTime}`)
    if (response.data.type === 0) {
      const { guilds, channels, users } = response.data.data

      if (!guilds[0]) {
        console.log('no update needed')
      } else {
        let channelsData: ChannelStateType = {}
        let guildData: GuildStateType = {}
        let memberData: MessageStateType = {}
        guilds.forEach(guild => guildData[guild.uid.toString()] = guild)
        channels.forEach(channel => channelsData[channel.uid.toString()] = {...channel, moreMessage: false, isValid: false, msgFetched: false})
        users.forEach(user => memberData[user.uid.toString()] = user)
        yield put(memberFns.initialMember(memberData))
        yield put(channelFns.updateChannel(channelsData))
        yield put(guildFns.updateGuild(guildData))
      }
    }
  }
}