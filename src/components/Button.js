import React from 'react'
import { Link } from 'react-router-dom'

const COLOR_PRIMARY = 'primary'
const COLOR_SECONDARY = 'secondary'

const buildClassName = (color = COLOR_PRIMARY, className = '', disabled = false) => {
  var options = className

  if (color === COLOR_PRIMARY) {
    options = `${options} bg-white bg-green-500 text-white`
  } else if (color === COLOR_SECONDARY) {
    options = `${options} bg-white text-green-700`
  }

  if (disabled) {
    options = `${options} opacity-50`
  }

  return `block w-full text-center p-2 rounded ${options}`
}

const Button = ({ color, className, disabled, children, ...props }) => (
  <button className={buildClassName(color, className, disabled)} disabled={disabled ? 'disabled' : ''} {...props}>
    {children}
  </button>
)

export const LinkButton = ({ color, className, children, ...props }) => (
  <Link className={buildClassName(color, className)} {...props}>{children}</Link>
)

function encode (text) {
  return window.encodeURIComponent(text)
}

export function TweetButton ({ url, via, text, related, hashtags, children, className, ...props }) {
  const tweetURL = React.useMemo(() => {
    var tweetURL = 'https://twitter.com/intent/tweet?'

    tweetURL += url ? `url=${encode(url)}&` : ''
    tweetURL += via ? `via=${encode(via)}&` : ''
    tweetURL += text ? `text=${encode(text)}&` : ''
    tweetURL += related ? `related=${encode(related)}&` : ''
    tweetURL += hashtags ? `hashtags=${encode(hashtags.join(','))}&` : ''

    return tweetURL
  }, [url, via, text, related, hashtags])

  return (
    <a href={tweetURL} target="_blank" rel="noopener noreferrer" className={`block text-white text-center p-2 w-full rounded bg-blue-500 ${className}`} {...props}>
      {children}
    </a>
  )
}

export default Button
