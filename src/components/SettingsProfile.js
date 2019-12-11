import React from 'react'
import { connect } from 'react-redux'
import { ArrowLeft } from 'react-feather'
import { Link, Redirect } from 'react-router-dom'

import actionCreator from '../actions'

import Form, { Field, Label, Input, ErrorAlert } from './Form'
import Button from './Button'

function Component ({ isReady, currentUser, submit, init, error, isProcessing, user }) {
  const [isMounted, setIsMounted] = React.useState(false)
  const [displayName, setDisplayName] = React.useState(user.displayName)
  const [photoURL, setPhotoURL] = React.useState(user.photoURL)

  const updateDisplayNameHandler = React.useCallback((event) => setDisplayName(event.target.value), [setDisplayName])
  const updatePhotoHandler = React.useCallback((event) => {
    setPhotoURL()
  }, [setPhotoURL])

  const submitHandler = React.useCallback(event => {
    event.preventDefault()
    if (isProcessing) return
    submit({
      ...user,
      displayName,
      photoURL
    })
  }, [displayName, photoURL, user, isProcessing, submit])

  React.useEffect(() => {
    if (isMounted) return
    init()
    setIsMounted(true)
  }, [isMounted, init])

  if (isReady && !currentUser) {
    return <Redirect to="/welcome" />
  }

  return (
    <div className="bg-green-600 min-h-screen flex flex-col">
      <div className="bg-green-600 text-white">
        <div className="max-w-lg mx-auto">
          <div className="flex py-4 px-2 items-center">
            <Link to="/i/settings" className="w-12 h-12 flex items-center justify-center mr-4">
              <ArrowLeft color="white" />
            </Link>
            <div className="font-bold text-lg">プロフィールの変更</div>
          </div>
        </div>
      </div>
      <div className="bg-white flex-grow flex flex-col">
        <Form onSubmit={submitHandler} className="w-full max-w-lg mx-auto flex-grow flex flex-col py-4 px-4">
          <div className="flex-grow mb-4">
            <Field>
              <Label htmlFor="displayNameInput">名前</Label>
              <Input id="displayNameInput" type="text" required value={displayName} onChange={updateDisplayNameHandler} />
            </Field>
            <Field>
              <Label htmlFor="photoURLInput">アイコン</Label>
              <Input id="photoURLInput" type="file" onChange={updatePhotoHandler} />
            </Field>
          </div>
          <ErrorAlert error={error} />
          <Button type="submit">保存する</Button>
        </Form>
      </div>
    </div>
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
  submit: (user) => dispatch(actionCreator.settings.profileUpdate(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
