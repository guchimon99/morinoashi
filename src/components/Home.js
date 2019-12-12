import React from 'react'
import { connect } from 'react-redux'

import actionCreator from '../actions'

import { LinkCardButton } from './CardButton'
import { QuestionCardList } from './QuestionCard'
import Header, { Title, GoSettings } from './Header'

function Component ({ currentUser, user, questions, get }) {
  const [isGot, setIsGot] = React.useState(false)

  React.useEffect(() => {
    if (isGot || !currentUser || !user) return
    get(currentUser.uid)
    setIsGot(true)
  }, [isGot, setIsGot, currentUser, user, get])

  return (
    <>
      <div className="bg-green-600 text-white">
        <div className="max-w-lg min-h-screen mx-auto flex flex-col py-16">
          <QuestionCardList creator={user} questions={questions} />
        </div>
      </div>
      <div className="fixed left-0 bottom-0 right-0">
        <div className="absolute bottom-0 mx-auto mb-4 w-40 left-0 right-0">
          <LinkCardButton to="/i/new" className="text-sm">
            質問を作成する
          </LinkCardButton>
        </div>
      </div>
      <Header>
        <GoSettings />
        <Title>作った質問</Title>
      </Header>
    </>
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
