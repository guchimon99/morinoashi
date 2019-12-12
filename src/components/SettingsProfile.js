import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import actionCreator from '../actions'

import Header, { Title, Back } from './Header'
import Form, { Field, Label, Input, ErrorAlert } from './Form'
import Button from './Button'

function Component ({ isReady, currentUser, submit, init, error, isProcessing, user }) {
  const [isMounted, setIsMounted] = React.useState(false)
  const [displayName, setDisplayName] = React.useState(user.displayName)

  const updateDisplayNameHandler = React.useCallback((event) => setDisplayName(event.target.value), [setDisplayName])
  const isSubmittable = React.useMemo(() => !!(!isProcessing && displayName), [isProcessing, displayName])

  const submitHandler = React.useCallback(event => {
    event.preventDefault()
    if (!isSubmittable) return
    submit(user.id, { displayName })
  }, [displayName, user, isSubmittable, submit])

  React.useEffect(() => {
    if (isMounted) return
    init()
    setIsMounted(true)
  }, [isMounted, init])

  if (isReady && !currentUser) {
    return <Redirect to="/welcome" />
  }

  return (
    <>
      <div className="max-w-lg mx-auto pt-16 min-h-screen flex flex-col">
        <Form onSubmit={submitHandler} className="w-full max-w-lg mx-auto flex-grow flex flex-col py-4 px-4">
          <div className="flex-grow mb-4">
            <Field>
              <Label htmlFor="displayNameInput">名前</Label>
              <Input id="displayNameInput" type="text" required value={displayName} onChange={updateDisplayNameHandler} />
            </Field>
          </div>
          <ErrorAlert error={error} />
          <Button type="submit" disabled={!isSubmittable}>
            {isProcessing ? '処理中'
              : isSubmittable ? '保存する'
                : '入力してください'
            }
          </Button>
        </Form>
      </div>
      <Header>
        <Back to="/i/settings" />
        <Title>プロフィール変更</Title>
      </Header>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { isReady, currentUser } = state.app
  const { isProcessing, error } = state.profileUpdate
  const user = currentUser ? state.users[currentUser.uid] : null

  return { isReady, currentUser, error, isProcessing, user }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actionCreator.settings.profileUpdateInit()),
  submit: (userID, data) => dispatch(actionCreator.settings.profileUpdate(userID, data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
