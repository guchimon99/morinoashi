import React from 'react'
import { connect } from 'react-redux'
import actionCreator from '../actions'

function Component ({ isReady, init }) {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    if (isMounted) return
    init()
    setIsMounted(true)
  }, [isMounted, setIsMounted, init])

  if (isReady) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-green-500 flex flex-col justify-center text-white">
      <div className="text-center font-bold text-2xl mb-8">森の葦</div>
      <div className="text-sm text-center">読込中</div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isReady: state.app.isReady
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actionCreator.app.init())
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
