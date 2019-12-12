import React from 'react'
import { ArrowLeft, User } from 'react-feather'
import { Link } from 'react-router-dom'

export const GoSettings = () => (
  <Link to="/i/settings" className="p-3 rounded-full">
    <User color="#666666" />
  </Link>
)

export const Back = ({ to }) => (
  <Link to={to} className="p-3 rounded-full">
    <ArrowLeft color="#666666" />
  </Link>
)

export const Title = ({ children }) => (
  <div className="font-bold flex-grow mx-2 py-3 text-gray-900">
    {children}
  </div>
)

function Header ({ children }) {
  return (
    <div className="bg-white border-b shadow-lg fixed top-0 left-0 right-0">
      <div className="max-w-lg mx-auto flex px-2 items-center">
        {children}
      </div>
    </div>
  )
}

export default Header
