/*
 * @Author: your name
 * @Date: 2020-04-03 16:05:53
 * @LastEditTime: 2020-05-26 20:47:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/sagas/index.ts
 */
import { fork } from "redux-saga/effects"
import { loginFlow, tokenAuthFlow, patchUser } from "./userSaga"
import { createGuild, patchGuild, fetchGuild, initialFetch } from "./guildSaga"
import { fetchMessage, fetchOldMessage, postMessage } from "./messageSaga"
import { createChannel } from "./channelSaga"
import { changeCurrentGuild, changeCurrentChannel } from "./websocketSaga"
import { createLink, getLink, joinLink } from "./linkSaga"
export default function* rootSaga() {
  yield fork(initialFetch)
  yield fork(loginFlow)
  yield fork(tokenAuthFlow)
  yield fork(fetchGuild)
  yield fork(fetchMessage)
  yield fork(fetchOldMessage)
  yield fork(postMessage)
  yield fork(createGuild)
  yield fork(patchGuild)
  yield fork(createChannel)
  yield fork(changeCurrentGuild)
  yield fork(changeCurrentChannel)
  yield fork(patchUser)
  yield fork(createLink)
  yield fork(getLink)
  yield fork(joinLink)
}
