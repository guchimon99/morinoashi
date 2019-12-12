import React from 'react'
import { Link } from 'react-router-dom'

const Placeholder = ({ message }) => (
  <div className="flex-grow flex flex-col justify-center">
    <div className="opacity-50 px-4 text-center text-xl">{message}</div>
  </div>
)

const Container = ({ children }) => (
  <div className="flex-grow px-2 pb-16 flex flex-col pt-4">
    {children}
  </div>
)

export function QuestionCardList ({ creator, questions }) {
  if (!questions) {
    return (
      <Container>
        <QuestionCard isPlaceholder={true} />
        <QuestionCard isPlaceholder={true} />
        <QuestionCard isPlaceholder={true} />
        <QuestionCard isPlaceholder={true} />
        <QuestionCard isPlaceholder={true} />
        <QuestionCard isPlaceholder={true} />
        <QuestionCard isPlaceholder={true} />
      </Container>
    )
  } else if (questions.length < 1) {
    return (
      <Container>
        <Placeholder message={'質問がありません'} />
      </Container>
    )
  }

  return (
    <Container>
      {questions.map(question =>
        <div key={question.id} className="mb-4">
          <QuestionCard creator={creator} question={question} />
        </div>
      )}
    </Container>
  )
}

function QuestionCard ({ creator, question, isPlaceholder }) {
  const className = React.useMemo(() => `block bg-white text-black rounded-lg shadow p-4 font-bold ${isPlaceholder ? 'opacity-50 h-12' : ''}`, [isPlaceholder])

  if (isPlaceholder) {
    return <div className={className}></div>
  }

  return (
    <Link to={`/${creator.id}/questions/${question.id}`} className={className}>
      {question.body}
    </Link>
  )
}

export default QuestionCard
