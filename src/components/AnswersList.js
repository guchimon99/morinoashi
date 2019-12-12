import React from 'react'
import { Link } from 'react-router-dom'

const Placeholder = ({ message }) => (
  <div className="py-24 text-center text-gray-500 text-lg">
    {message}
  </div>
)

const AnswersList = ({ userID, questionID, answers }) => {
  if (!answers) {
    return <Placeholder message={'読込中'} />
  } else if (answers.length < 1) {
    return <Placeholder message={'回答がありません'} />
  } else {
    return answers.map(answer =>
      <Link key={answer.id} to={`/${userID}/questions/${questionID}/answers/${answer.id}`}
        className="border-b px-4 py-3 border-b block">
        {answer.body}
      </Link>
    )
  }
}

export default AnswersList
