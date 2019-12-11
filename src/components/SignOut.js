import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import actionCreator from '../actions'

function Component ({ signOut, currentUser }) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    if (isMounted) return
    signOut()
    setIsMounted(true)
  }, [isMounted, signOut])

  if (!currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="fixed bg-green-600 text-white flex flex-col justify-center items-center p-4">
      <div className="text-xs">
        サインアウト中
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.app.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  signOut: () => dispatch(actionCreator.app.signOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
