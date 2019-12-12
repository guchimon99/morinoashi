import React from 'react'
import { connect } from 'react-redux'
import { Clipboard } from 'react-feather'

import { TweetButton } from './Button'
import { TextArea } from './Form'
import Header, { Title, Back } from './Header'
import { LinkCardButton } from './CardButton'

function Component ({ userID, questionID, answerID, user, question, answer }) {
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
    <>
      <div className="bg-green-600 text-white">
        <div className="max-w-lg min-h-screen flex flex-col mx-auto py-12">
          <div className="flex-grow flex flex-col justify-center p-4">
            <div className="rounded-lg shadow-lg bg-white text-black">
              <div className="p-4 border-b">
                <div className="flex items-center mb-2">
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
        </div>
      </div>
      <Header>
        <Back to={`/${userID}/questions/${questionID}`} />
        <Title>回答</Title>
      </Header>
      <div className="fixed left-0 bottom-0 right-0">
        <div className="absolute bottom-0 mx-auto mb-4 w-48 left-0 right-0">
          <LinkCardButton to={`/${userID}/questions/${questionID}/answers/new`} className="text-sm">この質問に回答する</LinkCardButton>
        </div>
      </div>
    </>
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
