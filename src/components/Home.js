import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { User } from 'react-feather'

import actionCreator from '../actions'

import { LinkCardButton } from './CardButton'
import { QuestionCardList } from './QuestionCard'

function Component ({ currentUser, user, questions, get }) {
  const [isGot, setIsGot] = React.useState(false)

  React.useEffect(() => {
    if (isGot || !currentUser || !user) return
    get(currentUser.uid)
    setIsGot(true)
  }, [isGot, setIsGot, currentUser, user, get])

  return (
    <div className="bg-green-600 text-white">
      <div className="max-w-lg min-h-screen mx-auto flex flex-col pt-4">
        <div className="h-12 flex flex-row-reverse px-4">
          <Link to="/i/settings" className="w-12 h-12 flex items-center justify-center">
            <User color="white" />
          </Link>
        </div>
        <div className="mb-4 -mt-12 h-12 self-center flex items-center justify-center">
          <div className="text-xl font-bold">作った質問</div>
        </div>
        <QuestionCardList creator={user} questions={questions} />

        <div className="fixed left-0 bottom-0 right-0">
          <div className="absolute bottom-0 mx-auto mb-4 w-40 left-0 right-0">
            <LinkCardButton to="/i/new" className="text-sm">
              質問を作成する
            </LinkCardButton>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { currentUser } = state.app
  const user = currentUser ? state.users[currentUser.uid] : null
  const questions = (user ? Object.values(user.questions || {}) : null) || []
  return { currentUser, user, questions }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  get: (userID) => dispatch(actionCreator.questions.getByUserID(userID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
