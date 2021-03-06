import React from 'react'
import { connect } from 'react-redux'

import questionDrawer from '../drawers/question'

import actionCreator from '../actions'

import CardButton from './CardButton'
import Form, { Field, Label, TextArea, ErrorAlert } from './Form'
import Header, { Back, Title } from './Header'

function Component ({ submit, user, currentUser, isProcessing, error }) {
  const canvasRef = React.createRef(null)

  const [body, setBody] = React.useState('')
  const [renderedBody, setRenderedBody] = React.useState('')
  const [image, setImage] = React.useState(null)

  const updateBodyHandler = React.useCallback(event => setBody(event.target.value), [setBody])
  const updateCanvasHandler = React.useCallback(body => blob => {
    setImage(blob)
    setRenderedBody(body)
  }, [setImage])
  const submitHandler = React.useCallback(event => {
    event.preventDefault()
    if (isProcessing) return
    submit(currentUser.uid, { body }, image)
  }, [submit, currentUser, body, image, isProcessing])

  const isSubmittable = React.useMemo(() => {
    return !!(currentUser && currentUser.uid && user && body && body === renderedBody && !isProcessing)
  }, [currentUser, body, isProcessing, user, renderedBody])

  React.useEffect(() => {
    if (!user || body === renderedBody) return
    const canvas = canvasRef.current
    questionDrawer(canvas, user, { body })
    canvas.toBlob(updateCanvasHandler(body))
  }, [user, body, canvasRef, updateCanvasHandler, renderedBody])

  return (
    <>
      <div className="bg-green-600 text-white">
        <Form onSubmit={submitHandler} className="max-w-lg min-h-screen mx-auto flex flex-col py-16">
          <div className="flex-grow flex flex-col px-2 justify-center">
            <div className="bg-white text-black rounded-lg shadow">
              <div className="flex items-center p-4">
                <div className="text-sm">{user ? user.displayName : ''}</div>
              </div>
              <Field className="flex-grow flex flex-col px-4">
                <Label htmlFor="bodyInput" className="hidden">質問の内容</Label>
                <TextArea
                  id="bodyInput" className="flex-grow font-bold" placeholder="みんなに聞いてみたいことを書こう"
                  requreid="required" rows={10}
                  value={body} onChange={updateBodyHandler} />
              </Field>
              <div className="px-4">
                <ErrorAlert error={error} />
              </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-auto hidden" />
          </div>
          <div className="fixed left-0 bottom-0 right-0">
            <div className="absolute bottom-0 mx-auto mb-4 w-40 left-0 right-0">
              <CardButton className="text-sm" disabled={!isSubmittable} type="submit" style={{ transition: 'all .5s ease 0s', minWidth: '10rem' }}>
                {isProcessing ? '作成中'
                  : isSubmittable ? '作成する'
                    : '入力してください'
                }
              </CardButton>
            </div>
          </div>
        </Form>
      </div>
      <Header>
        <Back to="/i" />
        <Title>質問の作成</Title>
      </Header>
    </>

  )
}

const mapStateToProps = (state, ownProps) => {
  const { currentUser } = state.app
  const user = currentUser ? state.users[currentUser.uid] : null
  const { error, isProcessing } = state.questionsCreate

  return { currentUser, user, error, isProcessing }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actionCreator.questions.createInit()),
  submit: (userID, data, image) => dispatch(actionCreator.questions.create(userID, data, image))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
