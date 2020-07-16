import React from 'react'
import styled from 'styled-components'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { Tooltip } from 'antd';

const defaultProps = {
  avatar: 'https://cdn.discordapp.com/icons/442204458961862657/1dcae90ab46927ffaeb6956b897e4efc.png?size=128'
}

const normalClassName = 'nav-item'
const activeClassName = 'nav-item-active'

interface StyledLinkProps extends NavLinkProps {
  isSvg: boolean,
}

const StyledLink = styled(({ isSvg, ...rest }: StyledLinkProps) => <NavLink {...rest} />).attrs({
  className: normalClassName,
  activeClassName
})`
  /* normalClassName */
  &.${normalClassName} {
    position: relative;
    &::before {
      content: "";
      background-color: #fff;
      width: 4px;
      height: ${props => props.isSvg ? '0' : '8px'};
      position: absolute;
      left: -11px;
      top: 19px;
      border-radius: 0 4px 4px 0;
    }
    &:hover::before {
      height: 24px;
      top: 12px;
    }
  }
  /* activeClassName */
  &.${activeClassName} {
    &::before, &:hover::before {
      height: 40px;
      top: 4px;
    }
  }
`
const LinkImg = styled.div`
  fill: #55b581;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${props => props.theme.color.bgPrimary};
  margin-bottom: 8px;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-radius: 18px;
    background-color: #55b581;
    fill: #fff;
  }

  img {
    width: 100%;
    height: 100%;
  }
`
type PropsType = {
  name: string,
  url: string,
  avatar?: string,
  isSvg?: boolean,
  children?: React.ReactNode,
  handleClick?: React.MouseEventHandler,
  changeGuildhandler?(): void 
}

function NavButton({ name, url, avatar, isSvg, handleClick, children, changeGuildhandler }: PropsType) {
  const clickHandler = (e: React.MouseEvent) => {
    if (handleClick) {
      handleClick(e)
    }
    if (changeGuildhandler) {
      changeGuildhandler()
    }
  }
  return (
    <Tooltip
      title={name}
      placement="right"
      mouseEnterDelay={0.5}
      align={
        {
          offset: [12, 0]
        }
      }>
      <StyledLink
        exact
        to={url}
        isSvg={Boolean(isSvg)}
        onClick={clickHandler}
      >
        <LinkImg>
          {isSvg ? children : <img src={avatar} alt="" />}
        </LinkImg>
      </StyledLink>
    </Tooltip>
  )
}

NavButton.defaultProps = defaultProps

export default React.memo(NavButton)