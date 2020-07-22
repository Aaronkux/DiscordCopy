import { take, call, put, select } from "redux-saga/effects"
import { AxiosResponse } from "axios"
import { message } from "antd"
import { post, get, patch } from "../../utils/fetch"
import { RootState } from "../configStore"
import {
  ConstantTypes as UserConstantTypes,
  actionFns as userFns,
  LoginStartType,
  PatchUserType,
  StateType as UserStateType,
} from "../modules/user"
import { actionFns as memberFns } from '../modules/member'

export function* loginFlow() {
  while (true) {
    const request: LoginStartType = yield take(UserConstantTypes.LOGIN_START)
    const { username, password } = request
    const response: AxiosResponse = yield call(post, `login`, {
      username,
      password,
    })
    if (response.data.type === 0) {
      const data = response.data.data
      localStorage.setItem("token", data.token)
      yield put(userFns.loginSuccess(data))
    } else {
      yield put(userFns.loginFailure(response.data.msg))
    }
  }
}

export function* tokenAuthFlow() {
  while (true) {
    yield take(UserConstantTypes.TOKEN_AUTH)
    const response: AxiosResponse = yield call(get, `auth`)
    if (response.data.type === 0) {
      const data = response.data.data
      localStorage.setItem("token", data.token)
      yield put(userFns.loginSuccess(data))
    } else {
      console.log(response.data.msg)
      localStorage.removeItem("token")
      yield put({ type: UserConstantTypes.TOKEN_EXPIRED })
    }
  }
}

export function* patchUser() {
  while (true) {
    const request: PatchUserType = yield take(UserConstantTypes.PATCH_USER)
    const { uid: userId } = yield select((state: RootState) => state.user)
    const { name, file } = request
    let form = new FormData()
    if (file) form.append("file", file)
    form.set("name", name)
    form.set("userId", userId.toString())
    const response: AxiosResponse<{
      type: number
      code: number
      data: UserStateType
    }> = yield call(patch, "user", form)
    if (response.data.type === 0) {
      const { name, avatar } = response.data.data
      yield put(userFns.patchUserSuccess(name!, avatar))
      yield put(memberFns.updateMember(userId, name!, avatar))
      message.success("更新成功", 3)
    }
  }
}
