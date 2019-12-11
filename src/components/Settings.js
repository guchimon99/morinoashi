import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch, Route } from 'react-router-dom'

import Menu from './SettingsMenu'
import Profile from './SettingsProfile'

function Component ({ isReady, currentUser, user }) {
  if (isReady && !currentUser) {
    return <Redirect to="/" />
  }

  if (!isReady || !user) {
    return <div />
  }

  return (
    <Switch>
      <Route exact path="/i/settings" component={Menu} />
      <Route exact path="/i/settings/profile" component={Profile} />
    </Switch>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { isReady, currentUser } = state.app
  const user = currentUser ? state.users[currentUser.uid] : null

  return { isReady, currentUser, user }
}

const mapDispatchToProps = (dispatch, ownProps) => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(Component)
