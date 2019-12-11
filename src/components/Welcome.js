import React from 'react'
import { connect } from 'react-redux'

import { LinkButton } from './Button'

function Component () {
  return (
    <div className="max-w-lg min-h-screen mx-auto p-4 flex flex-col">
      <div className="flex-grow flex flex-col justify-center mb-4">
        <div className="text-3xl font-bold text-black mb-4">
        「王様の耳はロバの耳」
        </div>
        <div className="text-lg text-gray-800">
          <p className="mb-4">知りたいけど、聞きづらい。あの人の言いにくことを聞いてみたいと思いませんか？</p>
          <p className="mb-4">森の葦はみんなが実名では答えづらいことを質問するための道具です。</p>
        </div>
      </div>
      <div>
        <LinkButton to={'/signup'} className="mb-4">使ってみる</LinkButton>
        <LinkButton to={'/signin'} color="secondary">ログインする</LinkButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
