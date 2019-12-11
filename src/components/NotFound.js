import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function Component () {
  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-gray-900 font-bold text-xl mb-8">404</div>
      <Link to="/" className="p-2">トップへ</Link>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (state, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
