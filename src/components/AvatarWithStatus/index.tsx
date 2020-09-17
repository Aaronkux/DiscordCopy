import React from 'react'
import styled from 'styled-components'

import {ReactComponent as PointSvg} from './point.svg'

const Avatar = styled.div<{ avatar: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url(${props => props.avatar});
  background-repeat: round;
  position: relative;
`

const StatusContainer = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #292b2f;
  position: absolute;
  bottom: -3px;
  right: -3px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Status = styled(({online, ...rest}: {online: boolean | undefined}) => <PointSvg {...rest} />)`
  fill: ${props=>props.online ? '#43B5BD' :  '#727c8a'};
  transform: scale(1.5, 1.5) translateY(-2px);
`

type PropsType = {
  avatar: string,
  online?: boolean
}

function AvatarWithStatus({ avatar, online }: PropsType) {
  return (
    <Avatar avatar={avatar} >
      <StatusContainer>
        <Status online={online} />
      </StatusContainer>
    </Avatar>
  )
}

export default React.memo(AvatarWithStatus)