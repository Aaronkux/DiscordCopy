import React from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group"
import SubTitle from "./SubTitle"

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`

const ModalContainer = styled.div<{
  wrapperWidth?: string
  wrapperHeight?: string
}>`
  width: ${(props) => props.wrapperWidth || "40%"};
  height: ${(props) => props.wrapperHeight || "auto"};
  background-color: #36393f;
  z-index: 999;
  &.scaleIn-appear {
    transform: scale(0, 0);
  }

  &.scaleIn-appear-active {
    transform: scale(1, 1);
    transition: transform 500ms;
  }
`

const ModalHeader = styled.div`
  width: 100%;
  padding: 20px;
  line-height: 20px;
  height: 60px;
`

const ModalContent = styled.div`
  width: 100%;
  padding: 20px;
`

const ModalBottom = styled.div`
  width: 100%;
  height: 78px;
  padding: 20px;
  background-color: #2f3136;
  display: flex;
  justify-content: flex-end;
`

const SubmitButton = styled.button`
  width: 96px;
  height: 34px;
  padding: 2px 16px;
  background-color: #7289da;
  border: none;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 998;
  transform: translateZ(0);
`

type PropType = {
  width?: string
  height?: string
  children?: React.ReactNode
  title: string
  submitText?: string
  visible?: boolean
  submitClick?: React.MouseEventHandler
  onCancel: () => void
}

function Modal({
  width,
  height,
  children,
  title,
  submitText = "submit",
  visible = false,
  submitClick,
  onCancel,
}: PropType) {
  return (
    <ModalWrapper hidden={!visible}>
      <CSSTransition
        in={visible}
        classNames="scaleIn"
        appear
        timeout={{
          appear: 500,
        }}
      >
        <ModalContainer wrapperWidth={width} wrapperHeight={height}>
          <ModalHeader>{title}</ModalHeader>
          <ModalContent>{children}</ModalContent>
          <ModalBottom>
            <SubmitButton onClick={submitClick}>{submitText}</SubmitButton>
          </ModalBottom>
        </ModalContainer>
      </CSSTransition>
      <Mask
        onClick={(e) => {
          onCancel()
          e.stopPropagation()
        }}
      />
    </ModalWrapper>
  )
}

Modal.SubTitle = SubTitle

export default Modal
