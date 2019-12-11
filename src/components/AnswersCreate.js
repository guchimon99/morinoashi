import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'

import answerDraw from '../drawers/answer'
import actionCreator from '../actions'

import CardButton from './CardButton'
import Form, { ErrorAlert } from './Form'

function Component ({ userID, questionID, question, user, isProcessing, error, submit, init, isMine }) {
  const canvasRef = React.createRef(null)

  const [isMounted, setIsMounted] = React.useState(false)

  const [body, setBody] = React.useState('')
  const [renderedBody, setRenderedBody] = React.useState('')
  const [image, setImage] = React.useState(null)

  const isSubmittable = React.useMemo(() => {
    return !!(!isProcessing && userID && questionID && body && image && body === renderedBody)
  }, [isProcessing, userID, questionID, body, image, renderedBody])

  const isShouldRender = React.useMemo(() => {
    return !!(user && question && body && body !== renderedBody)
  }, [user, question, body, renderedBody])

  const updateBodyHandler = React.useCallback(event => setBody(event.target.value), [setBody])
  const updateCanvasHandler = React.useCallback(body => blob => {
    setImage(blob)
    setRenderedBody(body)
  }, [setImage])

  const submitHandler = React.useCallback(event => {
    event.preventDefault()
    if (isProcessing) return
    const data = { body }
    submit(userID, questionID, data, image)
  }, [isProcessing, userID, questionID, body, submit, image])

  React.useEffect(() => {
    if (isMounted) return
    init()
    setIsMounted(true)
  }, [init, isMounted])

  React.useEffect(() => {
    if (!isShouldRender) return
    const canvas = canvasRef.current
    answerDraw(canvas, user, question, { body })
    canvas.toBlob(updateCanvasHandler(body))
  }, [body, user, canvasRef, isShouldRender, question, updateCanvasHandler])

  return (
    <Form onSubmit={submitHandler} className="block bg-green-600 text-white">
      <div className="max-w-lg min-h-screen flex flex-col mx-auto py-4">
        {isMine ? (
          <div className="flex pt-4 px-2 items-center mb-4">
            <Link to={`${userID}/questions/${questionID}`} className="w-12 h-12 flex items-center justify-center mr-4">
              <ArrowLeft color="white" />
            </Link>
          </div>
        ) : null }
        <div className="flex-grow flex flex-col justify-center p-4">
          <div className="rounded-lg shadow-lg bg-white text-black">
            <div className="p-4 border-b">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                <div className="text-gray-800 text-sm flex-grow">{user ? user.displayName : ''}</div>
              </div>
              <div className="text-gray-900 text-sm font-bold w-full">{question ? question.body : ''}</div>
            </div>
            <div className="p-4">
              <textarea
                value={body} onChange={updateBodyHandler}
                cols="30" rows="10" placeholder="あなたの答えは？"
                className="block bg-transparent w-full" />
            </div>
            <div className="px-2">
              <ErrorAlert error={error} />
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden w-full h-auto" />
          <div className="mt-4 text-center">
            <a target="_blank" rel="noopener noreferrer" className="p-2 text-xs" href="/welcome">これは何？</a>
          </div>
        </div>
        <div className="px-4 flex justify-center">
          <CardButton disabled={!isSubmittable} type="submit">
            {isProcessing ? '処理中'
              : isSubmittable ? '回答する'
                : '回答を入力してください'}
          </CardButton>
        </div>
      </div>
    </Form>
  )
}

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.app.currentUser
  const { userID, questionID } = ownProps.match.params
  const user = state.users[userID] || null
  const question = user && user.questions ? user.questions[questionID] : null
  const isMine = (user && currentUser && currentUser.uid === userID)
  const { error, isProcessing } = state.answersCreate

  return {
    userID,
    questionID,
    user,
    question,
    error,
    isProcessing,
    isMine
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actionCreator.answers.createInit()),
  submit: (userID, questionID, data, image) => dispatch(actionCreator.answers.create(userID, questionID, data, image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
