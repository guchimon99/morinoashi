import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

import actionCreator from '../actions'

import { QuestionCardList } from './QuestionCard'

function Component ({ userID, user, questions, get, currentUser }) {
  const [isGot, setIsGot] = React.useState(false)

  React.useEffect(() => {
    if (isGot || !user) return
    get(userID)
    setIsGot(true)
  }, [get, isGot, user, userID])

  return (
    <div className="bg-green-600 text-white">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col pt-12">
        {currentUser ? (
          <div className="flex py-4 px-2 items-center">
            <Link to="/i" className="w-12 h-12 flex items-center justify-center mr-4">
              <ArrowLeft color="white" />
            </Link>
          </div>
        ) : null}
        <div className="py-8 px-4 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full mb-4" />
          <div className="text-xl">
            {user.displayName}
          </div>
        </div>
        <div className="mb-4">
          <div className="text-center font-bold">作った質問</div>
          <QuestionCardList creator={user} questions={questions} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { userID } = ownProps.match.params
  const user = state.users[userID] || null
  const questions = user && user.questions ? Object.values(user.questions) : null
  const currentUser = state.app.currentUser
  return { userID, user, questions, currentUser }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  get: (userID) => dispatch(actionCreator.questions.getByUserID(userID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
