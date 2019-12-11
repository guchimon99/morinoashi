import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { ArrowLeft, Clipboard } from 'react-feather'

import actionCreator from '../actions'

import { TweetButton } from './Button'
import { LinkCardButton } from './CardButton'

const Placeholder = ({ message }) => (
  <div className="py-24 text-center text-gray-500 text-lg">
    {message}
  </div>
)

function Component ({ isReady, isMine, userID, questionID, getAnswers, user, question, answers }) {
  const [isGot, setIsGot] = React.useState(false)

  const { protocol, hostname, port } = window.location

  const inputRef = React.createRef(null)

  const isShouldGet = React.useMemo(() => !!(!isGot && isMine && user && question), [isGot, isMine, user, question])

  const shareURL = React.useMemo(() =>
    `${protocol}//${hostname}${port === '' ? '' : `:${port}`}/${userID}/questions/${questionID}`
  , [protocol, hostname, port, userID, questionID])

  const copyHandler = React.useCallback((event) => {
    inputRef.current.select()
    document.execCommand('copy')
    alert('コピーしました')
  }, [inputRef])

  React.useEffect(() => {
    if (!isShouldGet) return
    getAnswers(userID, questionID)
    setIsGot(true)
  }, [isShouldGet, userID, questionID, getAnswers])

  if (isReady && !isMine) {
    return <Redirect path="*" to={`/${userID}/questions/${questionID}/answers/new`}/>
  }

  return (
    <div className="bg-green-600 text-white">
      <div className="max-w-lg min-h-screen mx-auto flex flex-col">
        {isMine ? (
          <div className="flex pt-4 px-2 items-center mb-4">
            <Link to="/i" className="w-12 h-12 flex items-center justify-center mr-4">
              <ArrowLeft color="white" />
            </Link>
          </div>
        ) : null}
        <div className="px-2 pb-12 flex-grow">
          <div className="bg-white text-black rounded-lg shadow mb-8">
            <div className="flex items-center p-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-2"></div>
              <div className="text-sm">{user ? user.displayName : ''}</div>
            </div>
            <div className="text-lg font-bold px-4 py-3 mb-4">
              {question ? question.body : ''}
            </div>
            <div className="text-center text-sm text-gray-600 mb-4"></div>
            <div className="px-2 pb-2">
              {question ? (
                <TweetButton url={shareURL} text={question.body} hashtags={['森の葦']} className="flex justify-center mb-2">
                  ツイッターで回答を募集する
                </TweetButton>
              ) : null}
              <div className="flex text-xs">
                <input
                  className="border p-2 rounded flex-grow mr-2 bg-gray-100" type="text"
                  readOnly ref={inputRef} value={shareURL} />
                <button onClick={copyHandler} className="bg-gray-300 p-2 rounded">
                  <Clipboard size="16" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center font-bold mb-4">質問への回答</div>
          <div className="bg-white text-black rounded-lg shadow overflow-hidden">
            {!answers ? (
              <Placeholder message={'読込中'} />
            ) : (
              answers.length < 1 ? (
                <Placeholder message={'回答がありません'} />
              ) : (
                answers.map(answer =>
                  <Link key={answer.id} to={`/${userID}/questions/${questionID}/answers/${answer.id}`}
                    className="border-b px-4 py-3 border-b block">
                    {answer.body}
                  </Link>
                )
              )
            )}
          </div>
        </div>
        <div className="flex justify-center pb-4">
          <LinkCardButton to={`/${userID}/questions/${questionID}/answers/new`} className="text-sm">回答する</LinkCardButton>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { isReady, currentUser } = state.app
  const { userID, questionID } = ownProps.match.params
  const user = state.users[userID] || null
  const question = (user ? user.questions[questionID] : null) || null
  const answers = (question ? Object.values(question.answers) : null) || null
  const isMine = !!(currentUser && currentUser.uid === userID)

  return { isReady, isMine, userID, questionID, user, question, answers }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAnswers: (userID, questionID) => dispatch(actionCreator.answers.getByUserIDAndQuestionID(userID, questionID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
