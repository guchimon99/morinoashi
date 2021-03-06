import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import QuestionsDetail from './QuestionsDetail'
import Answers from './Answers'

import actionCreator from '../actions'

function Component ({ user, get, userID, questionID }) {
  const [isGot, setIsGot] = React.useState(false)

  const isShouldGet = React.useMemo(() => !!(!isGot && user && questionID && questionID !== 'new'), [isGot, user, questionID])

  React.useEffect(() => {
    if (!isShouldGet) return
    get(userID, questionID)
    setIsGot(true)
  }, [get, isGot, questionID, userID, isShouldGet])

  return (
    <Switch>
      <Route exact path={'/:userID/questions/:questionID'} component={QuestionsDetail} />
      <Route path={'/:userID/questions/:questionID/answers/:answerID'} component={Answers} />
      <Route path={'/:userID/questions/:questionID/answers'} component={Answers} />
    </Switch>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { userID, questionID } = ownProps.match.params
  const user = state.users[userID] || null

  return { user, userID, questionID }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  get: (userID, questionID) => dispatch(actionCreator.questions.get(userID, questionID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
