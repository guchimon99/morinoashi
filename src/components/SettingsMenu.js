import React from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import Header, { Back, Title } from './Header'

function Component ({ isReady, currentUser, signOut }) {
  if (isReady && !currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <div className="py-16 max-w-lg mx-auto">
        <Link to={'/i/settings/profile'} className="border-b px-4 py-3 block">プロフィール変更</Link>
        <Link to={'/signout'} className="border-b px-4 py-3 block">ログアウト</Link>
      </div>
      <Header>
        <Back to="/i" />
        <Title>設定</Title>
      </Header>
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isReady: state.app.isReady,
  currentUser: state.app.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(Component)
