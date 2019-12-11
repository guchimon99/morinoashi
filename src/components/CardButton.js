import React from 'react'
import { Link } from 'react-router-dom'

const buildClassName = (className = '', disabled = false) => {
  var options = className

  if (disabled) {
    options = `${options} opacity-50`
  }

  return `block py-3 px-6 bg-white text-black rounded-full shadow-lg text-center ${options}`
}

const CardButton = ({ className, disabled, children, ...props }) => (
  <button className={buildClassName(className, disabled)} disabled={disabled ? 'disabled' : ''} {...props}>
    {children}
  </button>
)

export const LinkCardButton = ({ className, children, ...props }) => (
  <Link className={buildClassName(className)} {...props}>{children}</Link>
)

export default CardButton
