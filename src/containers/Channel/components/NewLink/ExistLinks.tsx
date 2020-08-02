import React from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { Row, Col } from "antd"
import { RootState } from "../../../../redux/configStore"
import { message } from "antd"
import { Link } from "../../../../redux/modules/link"

import CopySvg from "../../../../svg/copy.svg"

const LinksWrapper = styled(Row)`
  border-top: 1px solid #555;
  text-align: center;
`

const Container = styled.div`
  margin-bottom: 20px;
`

const SvgWrapper = styled.div`
  fill: #fff;
  cursor: pointer;
`

const getLinks = (state: RootState) => state.info.link
const currentLinks = createSelector(
  getLinks,
  (state: RootState, guildId: number) => guildId,
  (allLinks, guildId) =>
    Object.values(allLinks).filter((link) => link.guildId === guildId)
)

type PropType = {
  guildId: number
}

function LinkDisplay({ link }: { link: Link }) {
  return (
    <LinksWrapper>
      <Col span={10} offset={1}>
        {link.link}
      </Col>
      <Col span={8}>{link.slots}</Col>
      <Col span={2} offset={2}>
        <SvgWrapper
          onClick={() => {
            navigator.clipboard.writeText(link.link)
            message.success("copy success", 3)
          }}
        >
          <CopySvg />
        </SvgWrapper>
      </Col>
    </LinksWrapper>
  )
}

function ExistLinks({ guildId }: PropType) {
  const links = useSelector((state: RootState) => currentLinks(state, guildId))
  return (
    <Container>
      {links.length !== 0 ?
        <LinksWrapper style={{ border: "none" }}>
          <Col span={10} offset={1}>
            linkCode
          </Col>
          <Col span={8}>valid users left</Col>
          <Col span={4} offset={1}>
            copy
          </Col>
        </LinksWrapper>
        : 'invite your friend'
      }
      {links.map((link) => (
        <LinkDisplay key={link.id} link={link} />
      ))}
    </Container>
  )
}

export default React.memo(ExistLinks)
