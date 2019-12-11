import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import actionCreator from '../actions'

import Form, { Field, Label, Input, ErrorAlert } from './Form'
import Button from './Button'

function Component ({ isProcessing, error, currentUser, submit }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const updateEmailHandler = React.useCallback((event) => setEmail(event.target.value), [setEmail])
  const updatePasswordHandler = React.useCallback((event) => setPassword(event.target.value), [setPassword])
  const isSubmittable = React.useMemo(() => {
    return !!(!isProcessing && email && password)
  }, [isProcessing, email, password])
  const submitFormHandler = React.useCallback((event) => {
    event.preventDefault()
    if (isProcessing) return
    submit(email, password)
  }, [email, password, submit, isProcessing])

  if (currentUser) {
    return <Redirect to="/i" />
  }

  return (
    <div className="max-w-lg min-h-screen mx-auto flex flex-col">
      <div className="mb-8 py-8 px-4">
        <div className="text-gray-900 text-2xl font-bold mb-3">
          おかえりなさい！
        </div>
        <div className="text-gray-600 text-sm">
          ログインすると質問がつくれます。
        </div>
      </div>

      <Form className="flex-grow flex flex-col px-4" onSubmit={submitFormHandler}>
        <div className="flex-grow">
          <Field>
            <Label htmlFor="emailInput">メールアドレス</Label>
            <Input
              id="emailInput" type="email" requried="requried" name="email" autoComplete="email"
              placeholder="メールアドレス" onChange={updateEmailHandler} />
          </Field>
          <Field>
            <Label htmlFor="passwordInput">パスワード</Label>
            <Input
              id="passwordInput" type="password" requried="requried" name="password" autoComplete="current-password"
              placeholder="パスワード" onChange={updatePasswordHandler} />
            <div className="py-2 text-xs text-gray-600">
              パスワードを忘れましたか？ <Link to="/forgot" className="text-blue-500 p-1 inline-block">パスワードを再設定する</Link>
            </div>
          </Field>
        </div>
        <ErrorAlert error={error} />
        <Button type="submit" disabled={!isSubmittable}>
          {
            isProcessing ? 'ログイン中'
              : isSubmittable ? 'ログインする'
                : '入力してください'
          }
        </Button>
      </Form>
      <div className="text-xs py-2 text-center">
        アカウントをお持ちでないですか？ <Link to="/signup" className="inline-block p-2 text-blue-500">アカウントを作成する</Link><br />
        <Link className="inline-block p-2 text-blue-500" to="/welcome">このサービスは何？</Link>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isProcessing: state.signIn.isProcessing,
  error: state.signIn.error,
  currentUser: state.app.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  init: () => dispatch(actionCreator.app.signUpInit()),
  submit: (email, password, displayName) => dispatch(actionCreator.app.signIn(email, password, displayName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
