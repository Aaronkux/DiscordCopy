import React from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'

import {RootState} from '../../redux/configStore'
import AvatarWithStatus from '../../components/AvatarWithStatus'
import { actionFns as topLayerFns } from '../../redux/modules/topLayerStatus'
import {ReactComponent as SettingSvg} from './setting.svg'


const Container = styled.div`
  width: 240px;
  height: 52px;
  flex: 0 0 52px;
  background-color: #292b2f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`

const SvgContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #35383e;
  }
`

function UserInfo() {
  const dispatch = useDispatch()
  const avatar = useSelector((state: RootState) => state.user.avatar)
  return (
    <Container>
      <AvatarWithStatus avatar={avatar} online />
      <SvgContainer onClick={()=>dispatch(topLayerFns.toggleUserSettingLayer())}>
        <SettingSvg />
      </SvgContainer>
    </Container>
  )
}

export default React.memo(UserInfo)
