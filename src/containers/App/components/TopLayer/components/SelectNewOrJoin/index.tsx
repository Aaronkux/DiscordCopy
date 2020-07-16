import React, { useState } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group';

import SelectGuild from './components/SelectGuild'
import NewGuild from './components/NewGuild'
import JoinGuild from './components/JoinGuild'

const Container = styled.div`
  width: 540px;
  padding: 24px 32px 0 32px;
  background-color: #fff;
  position: relative;
  overflow: hidden;

  &.select-container-appear {
    transform: scale(0, 0)
  }

  &.select-container-appear-active {
    transform: scale(1, 1);
    transition: transform 500ms;
  }
`




function SelectNewOrJoin() {
  // tag 0: select tag: 1 newGuild tag: 2 joinGuild
  const [tag, setTag] = useState(0)
  return (
    <CSSTransition
      in={true}
      classNames='select-container'
      appear
      timeout={{
        appear: 500,
      }}>
      <Container onClick={(e) => e.stopPropagation()}>
        {
          tag === 0 ? <SelectGuild handleClick={setTag} /> :
            tag === 1 ? <NewGuild handleClick={setTag} /> :
              <JoinGuild  handleClick={setTag} />
        }
      </Container>
    </CSSTransition>
  )
}

export default React.memo(SelectNewOrJoin)