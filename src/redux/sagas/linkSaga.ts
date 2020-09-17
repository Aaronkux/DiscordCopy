import { take, call, put, select } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { get, post } from "../../utils/fetch"
import { message } from 'antd'
import { RootState } from "../configStore"
import {
  actionFns as topLayerFns
} from '../modules/topLayerStatus'
import {
  ConstantTypes as LinkConstantTypes,
  CreatLink,
  GetLink,
  JoinLink,
  Link,
  StateType as LinkStateType,
  actionFns as linkFns,
} from "../modules/link"
import {
  Guild,
  StateType as GuildStateType,
  actionFns as guildFns,
} from "../modules/guild"
import {
  actionFns as channelFns,
  Channel,
  StateType as ChannelStateType,
} from "../modules/channel"
import {
  StateType as MessageStateType,
  Member,
  actionFns as memberFns,
} from "../modules/member"
import socket from '../../utils/websocket'

export function* getLink() {
  while (true) {
    const request: GetLink = yield take(LinkConstantTypes.GET_LINK)
    const { guildId } = request
    const response: AxiosResponse<{
      data: Link[]
      type: number
    }> = yield call(get, `invite?guildId=${guildId}`)
    if (response.data.type === 0) {
      let data: LinkStateType = {}
      const rawData = response.data.data
      rawData.forEach((item) => {
        data[item.id.toString()] = item
      })
      yield put(linkFns.addLink(data))
    }
  }
}

export function* createLink() {
  while (true) {
    const request: CreatLink = yield take(LinkConstantTypes.CREATE_LINK)
    const { guildId, slots } = request
    const userId: number = yield select((state: RootState) => state.user.uid)

    const response: AxiosResponse<{
      data: Link
      type: number
    }> = yield call(post, `invite`, {
      guildId,
      userId,
      slots,
    })
    if (response.data.type === 0) {
      const { id, link, userId, slots, guildId } = response.data.data
      let data: LinkStateType = {}
      data[id.toString()] = {
        id,
        link,
        userId,
        slots,
        guildId,
      }
      yield put(linkFns.addLink(data))
    }
  }
}

export function* joinLink() {
  while (true) {
    const request: JoinLink = yield take(LinkConstantTypes.JOIN_LINK)
    const { linkCode } = request
    const userId: number = yield select((state: RootState) => state.user.uid)

    const response: AxiosResponse<{
      type: number
      code: number
      msg?: string
      data: {
        guilds: Guild[]
        users: Member[]
        channels: Channel[]
      }
    }> = yield call(post, `joinLink`, {
      userId,
      linkCode,
    })
    if (response.data.type === 0) {
      const { guilds, channels, users } = response.data.data
      let channelsData: ChannelStateType = {}
      let guildData: GuildStateType = {}
      let memberData: MessageStateType = {}
      guilds.forEach((guild) => (guildData[guild.uid.toString()] = guild))
      channels.forEach(
        (channel) =>
          (channelsData[channel.uid.toString()] = {
            ...channel,
            moreMessage: false,
            isValid: false,
            msgFetched: false,
          })
      )
      users.forEach((user) => (memberData[user.uid.toString()] = user))
      yield put(memberFns.initialMember(memberData))
      yield put(channelFns.updateChannel(channelsData))
      yield put(guildFns.updateGuild(guildData))
      socket.emit('baseInfo', userId)
      message.success('加入成功', 3)
      yield put(topLayerFns.toggleNewOrJoinLayer())
    } else {
      message.error(response.data.msg, 3)
    }
  }
}
