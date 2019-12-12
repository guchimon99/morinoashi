import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import actionCreator from '../actions'

import Form, { Field, Label, Input, ErrorAlert } from './Form'
import Button from './Button'

function Component ({ isProcessing, error, currentUser, submit, init }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [isMounted, setIsMounted] = React.useState(false)

  const updateEmailHandler = React.useCallback((event) => setEmail(event.target.value), [setEmail])
  const updatePasswordHandler = React.useCallback((event) => setPassword(event.target.value), [setPassword])
  const updateDisplayNameHandler = React.useCallback((event) => setDisplayName(event.target.value), [setDisplayName])
  const isSubmittable = React.useMemo(() => !!(!isProcessing && email && password && displayName), [isProcessing, email, password, displayName])
  const submitFormHandler = React.useCallback((event) => {
    event.preventDefault()
    if (isProcessing) return
    submit(email, password, displayName)
  }, [email, password, displayName, submit, isProcessing])

  React.useEffect(() => {
    if (isMounted) return
    init()
    setIsMounted(true)
  }, [isMounted, setIsMounted, init])

  if (currentUser) {
    return <Redirect to="/i" />
  }

  return (
    <div className="max-w-lg min-h-screen mx-auto flex flex-col pt-12">
      <div className="mb-8 py-8 px-4">
        <div className="text-gray-900 text-2xl font-bold mb-3">
          アカウントを作成する
        </div>
        <div className="text-gray-600 text-sm">
          アカウントを手に入れると質問を作ることができます。
        </div>
      </div>

      <Form className="flex-grow flex flex-col px-4" onSubmit={submitFormHandler}>
        <div className="flex-grow">
          <Field>
            <Label htmlFor="displayNameInput">名前</Label>
            <Input
              id="displayNameInput" minLength={3} maxLength={50} type="text" requried="requried"
              name="name" autoComplete="name"
              placeholder="あなたの名前" onChange={updateDisplayNameHandler} />
          </Field>
          <Field>
            <Label htmlFor="emailInput">メールアドレス</Label>
            <Input
              id="emailInput" type="email" requried="requried" autoComplete="email" name="email"
              placeholder="メールアドレス" onChange={updateEmailHandler} />
          </Field>
          <Field>
            <Label htmlFor="passwordInput">パスワード</Label>
            <Input
              id="passwordInput" type="password" requried="requried"
              name="passowrd" autoComplete="new-password"
              placeholder="パスワード" onChange={updatePasswordHandler} />
          </Field>
        </div>
        <ErrorAlert error={error} />
        <Button type="submit" disabled={!isSubmittable}>
          {
            isProcessing ? '作成中'
              : isSubmittable ? 'アカウントを作成する'
                : '入力してください'
          }
        </Button>
      </Form>
      <div className="text-xs py-2 text-center">
        すでにアカウントをお持ちですか？ <Link to="/signin" className="inline-block p-2 text-blue-500">ログインする</Link><br />
        <Link className="inline-block p-2 text-blue-500" to="/welcome">このサービスは何？</Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isProcessing: state.signUp.isProcessing,
  error: state.signUp.error,
  currentUser: state.app.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actionCreator.app.signUpInit()),
  submit: (email, password, displayName) => dispatch(actionCreator.app.signUp(email, password, displayName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
