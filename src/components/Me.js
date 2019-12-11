import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './Home'
import Settings from './Settings'
import QuestionsCreate from './QuestionsCreate'

import actionCreator from '../actions'

function Component ({ currentUser, get, isReady }) {
  const [isGot, setIsGot] = React.useState(false)

  React.useEffect(() => {
    if (isGot || !currentUser) return
    get(currentUser.uid)
    setIsGot(true)
  }, [get, isGot, currentUser])

  if (isReady && !currentUser) {
    return <Redirect to={'/'} />
  }

  return (
    <>
      <Switch>
        <Route exact path="/i" component={Home} />
        <Route exact path="/i/new" component={QuestionsCreate} />
        <Route path="/i/settings" component={Settings} />
        <Redirect exact path="/i" to="/i/new" />
      </Switch>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isReady: state.app.isReady,
  currentUser: state.app.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get: (userID) => dispatch(actionCreator.users.get(userID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
