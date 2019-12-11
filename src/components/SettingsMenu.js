import React from 'react'
import { connect } from 'react-redux'
import { ArrowLeft } from 'react-feather'
import { Link, Redirect } from 'react-router-dom'

function Component ({ isReady, currentUser, signOut }) {
  if (isReady && !currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-green-600 text-white">
        <div className="max-w-lg mx-auto">
          <div className="flex py-4 px-2 items-center">
            <Link to="/i" className="w-12 h-12 flex items-center justify-center mr-4">
              <ArrowLeft color="white" />
            </Link>
            <div className="font-bold text-lg">質問の作成</div>
          </div>
        </div>
      </div>
      <div className="bg-white text-black flex-grow">
        <div className="max-w-lg mx-auto py-4">
          <Link to={'/i/settings/profile'} className="border-b px-4 py-3 block">プロフィール変更</Link>
          <Link to={'/signout'} className="border-b px-4 py-3 block">ログアウト</Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  isReady: state.app.isReady,
  currentUser: state.app.currentUser
})

const mapDispatchToProps = (dispatch, ownProps) => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(Component)
