import React, { Fragment } from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import { RootState } from "../../redux/configStore"
import { actionFns as topLayerFns } from "../../redux/modules/topLayerStatus"
import { actionFns as websocketFns } from "../../redux/modules/websocket"
import NavButton from "./components/NavButton"
import {ReactComponent as PlusSvg} from "../../svg/plus.svg"
import {ReactComponent as HomeSvg} from "../../svg/home.svg"

const SideBar = styled.aside`
  flex-basis: 72px;
  height: 100vh;
  background-color: ${(props) => props.theme.color.bgSideBar};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  flex-shrink: 0;
`

const Separator = styled.div`
  width: 35px;
  border-top: 2px solid #2c2e2f;
  margin-bottom: 8px;
`

export default function Sidebar() {
  const guilds = useSelector((state: RootState) => state.info.guild)
  const match = useRouteMatch()
  const dispatch = useDispatch()
  return (
    <SideBar>
      <NavButton name="首页" url="/app" isSvg>
        <HomeSvg />
      </NavButton>
      {Object.values(guilds).length > 0 ? <Separator /> : <Fragment />}

      {Object.values(guilds).map((guild) => (
        <NavButton
          name={guild.name}
          key={guild.uid}
          url={`${match.url}/${guild.uid.toString()}`}
          avatar={guild.avatar}
          changeGuildhandler={() => {
            dispatch(websocketFns.changeCurrentGuild(guild.uid))
          }}
        />
      ))}
      <Separator />
      <NavButton
        name="新增一个工会"
        url="/add"
        isSvg
        handleClick={(e) => {
          e.preventDefault()
          dispatch(topLayerFns.toggleNewOrJoinLayer())
        }}
      >
        <PlusSvg />
      </NavButton>
    </SideBar>
  )
}
