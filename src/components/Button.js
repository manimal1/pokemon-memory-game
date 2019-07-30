import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  width: 100px;
  height: 32px;
  border-radius: 10px;
  background-color: ${props => props.disabled ? 'grey' : props.bgColor};
  color: ${props => props.disabled ? 'azure' : props.labelColor};
`

const Button = props => {
  const {
    type = 'primary',
    label = '',
    onClick,
    disabled = false,
    bgColor = '',
    labelColor = ''
  } = props

  return (
    <StyledButton
      {...{
        type,
        onClick,
        disabled,
        bgColor,
        labelColor
      }}
    >
      {label}
    </StyledButton>
  )
}

export default Button
