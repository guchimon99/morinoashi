import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import actionCreator from '../actions'

import UsersDetail from './UsersDetail'
import Questions from './Questions'

function Component ({ get, userID }) {
  const [isGot, setIsGot] = React.useState(false)

  React.useEffect(() => {
    if (isGot) return
    get(userID)
    setIsGot(true)
  }, [isGot, get, userID])

  return (
    <Switch>
      <Route path="/:userID/questions/:questionID" component={Questions} />
      <Route path="/:userID/questions" component={Questions} />
      <Route path="/:userID" exact component={UsersDetail} />
    </Switch>
  )
}

const mapStateToProps = (state, ownProps) => ({
  userID: ownProps.match.params.userID
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  get: userID => dispatch(actionCreator.users.get(userID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
