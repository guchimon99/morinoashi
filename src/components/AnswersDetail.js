import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clipboard } from 'react-feather'

import { TweetButton } from './Button'
import { TextArea } from './Form'
import { LinkCardButton } from './CardButton'

function Component ({ userID, questionID, answerID, user, question, answer, isMine }) {
  const { protocol, hostname, port } = window.location

  const [comment, setComment] = React.useState('')

  const inputRef = React.createRef(null)
  const shareURL = React.useMemo(() =>
    `${protocol}//${hostname}${port === '' ? '' : `:${port}`}/${userID}/questions/${questionID}/answers/${answerID}`
  , [protocol, hostname, port, userID, questionID, answerID])

  const updateCommentHandler = React.useCallback(event => setComment(event.target.value), [setComment])
  const copyHandler = React.useCallback((event) => {
    inputRef.current.select()
    document.execCommand('copy')
    alert('コピーしました')
  }, [inputRef])

  return (
    <div className="bg-green-600 text-white">
      <div className="max-w-lg min-h-screen flex flex-col mx-auto">
        {isMine ? (
          <div className="flex pt-4 px-2 items-center mb-4">
            <Link to={`/${userID}/questions/${questionID}`} className="w-12 h-12 flex items-center justify-center mr-4">
              <ArrowLeft color="white" />
            </Link>
          </div>
        ) : null}
        <div className="flex-grow flex flex-col justify-center p-4">
          <div className="rounded-lg shadow-lg bg-white text-black">
            <div className="p-4 border-b">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                <div className="text-sm flex-grow">{user ? user.displayName : ''}</div>
              </div>
              <div className="text-sm font-bold w-full">{question ? question.body : ''}</div>
            </div>
            <div className="p-4 mb-4 text-lg">
              {answer ? (
                <div className="text-black">{answer.body}</div>
              ) : (
                <div className="text-gray-500 text-center">読込中</div>
              )}
            </div>
            <div className="mx-2">
              <TextArea placeholder="コメントをつけることができます。" value={comment} onChange={updateCommentHandler} />
            </div>
            <div className="p-2">
              <TweetButton url={shareURL} text={comment} className="mb-2" hashtags={['森の葦']}>ツイートで共有</TweetButton>
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
        </div>
        <div className="flex justify-center pb-4">
          <LinkCardButton to={`/${userID}/questions/${questionID}/answers/new`} className="text-sm">回答する</LinkCardButton>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { userID, questionID, answerID } = ownProps.match.params

  const { currentUser } = state.app
  const user = state.users[userID] || null
  const question = user && user.questions ? user.questions[questionID] : null
  const answer = question && question.answers ? question.answers[answerID] : null
  const isMine = currentUser && currentUser.uid === userID

  return { userID, questionID, answerID, user, question, answer, isMine }
}

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
