/*
 * @Author: your name
 * @Date: 2020-03-25 00:34:21
 * @LastEditTime: 2020-05-22 22:28:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/modules/index.ts
 */
import { combineReducers } from 'redux'
import { reducer as global } from './global'
import { reducer as user } from './user'
import { reducer as guild } from './guild'
import { reducer as channel } from './channel'
import { reducer as message } from './message'
import { reducer as member } from './member'
import { reducer as topLayerStatus } from './topLayerStatus'
import { reducer as websocket } from './websocket'
import { reducer as scroll } from './scroll'

const info = combineReducers({
  guild,
  channel,
  message,
  member
})

export default combineReducers({
  global,
  info,
  user,
  topLayerStatus,
  websocket,
  scroll
})