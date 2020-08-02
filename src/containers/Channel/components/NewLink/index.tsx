import React, { useState, useEffect } from "react"
import { useDispatch } from 'react-redux'
import Modal from "../../../../components/Modal"
import ExistLinks from './ExistLinks'
import { Slider, InputNumber, Row, Col } from "antd"

import { actionFns as linkFns } from '../../../../redux/modules/link'

type PropType = {
  guildId: number
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function NewLink({ guildId, visible, setVisible }: PropType) {
  const [inputValue, setInputValue] = useState(5)
  const dispatch = useDispatch()
  // get
  useEffect(() => {
    dispatch(linkFns.getLink(guildId))
  }, [guildId, dispatch])
  return (
    
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        submitClick={() => {
          // generator link request
          dispatch(linkFns.createLink(guildId, inputValue))
          setVisible(false)
        }}
        submitText='generate'
        width="500px"
        title="New LinkCode"
      >
        <ExistLinks guildId={guildId} />
        <Modal.SubTitle>Link Invite Limitation</Modal.SubTitle>
        <Row>
          <Col span={16}>
            <Slider
              min={1}
              max={20}
              onChange={(value) => setInputValue(value as number)}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              style={{ margin: "0 16px" }}
              onChange={(value) => setInputValue(value as number)}
              value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
        </Row>
      </Modal>
  )
}

export default React.memo(NewLink)
