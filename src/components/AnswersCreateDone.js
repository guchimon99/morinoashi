import React from 'react'
import { connect } from 'react-redux'

import { Smile } from 'react-feather'

import { LinkButton } from './Button'

function Component ({ userID, questionID, isMine }) {
  return (
    <div className="max-w-lg min-h-screen flex flex-col mx-auto py-4">
      <div className="flex-grow flex flex-col items-center justify-center p-4 pt-12">
        <Smile width={48} height={48} />
        <div className="w-full text-center px-4 text-lg text-gray-800 mt-6">ありがとう</div>
      </div>
      <div className="px-4">
        { isMine
          ? <LinkButton to="/i" className="mb-4">新しい質問を作る</LinkButton>
          : <LinkButton to="/signup" className="mb-4">質問を作ってみる</LinkButton>
        }
        <LinkButton to="/welcome" color="secondary">これは何？</LinkButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { userID, questionID } = ownProps.match.params
  const currentUser = state.app.currentUser
  const isMine = currentUser && currentUser.uid === userID

  return { userID, questionID, isMine }
}

const mapDispatchToProps = (state, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
