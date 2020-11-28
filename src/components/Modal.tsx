import React from 'react'
import styled from 'styled-components'
import Button from './Button'

export default function Settings({children, onClose}) {
  return (
    <Outer
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose()
      }}
    >
      <Inner>
        <Content>{children}</Content>
        <Button onClick={onClose}>Done</Button>
      </Inner>
    </Outer>
  )
}

const Content = styled.div``

const Outer = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

const Inner = styled.section`
  border-radius: 10px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 600px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
