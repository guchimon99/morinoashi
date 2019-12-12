import React from 'react'
import { connect } from 'react-redux'

import { LinkButton } from './Button'

function Component () {
  return (
    <div className="max-w-lg min-h-screen mx-auto pt-12 pb-4 flex flex-col">
      <div className="flex-grow flex flex-col justify-center px-4 mb-4">
        <div className="text-3xl font-bold text-black mb-4">
        「王様の耳はロバの耳」
        </div>
        <div className="text-lg text-gray-800">
          <p className="mb-4">知りたいけど、聞きづらい。あの人の言いにくことを聞いてみたいと思いませんか？</p>
          <p className="mb-4">森の葦はみんなが実名では答えづらいことを質問するための道具です。</p>
        </div>
      </div>
      <div className="px-2 flex">
        <div className="px-2 w-1/2">
          <LinkButton to={'/signup'} className="text-sm">アカウント作成</LinkButton>
        </div>
        <div className="px-2 w-1/2">
          <LinkButton to={'/signin'} color="secondary" className="text-sm">ログイン</LinkButton>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({})

const mapDispatchToProps = (dispatch, ownProps) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
