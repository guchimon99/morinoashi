import {
  initCanvas,
  drawBackground,
  drawCard,
  drawUser,
  drawSubQuestion,
  drawAnswer
} from './functions'

function answerDrawer (canvas, user, question, answer) {
  initCanvas(canvas)

  const ctx = canvas.getContext('2d')
  drawBackground(ctx)
  drawCard(ctx)
  drawUser(ctx, user)
  drawSubQuestion(ctx, question)
  drawAnswer(ctx, answer)
}

export default answerDrawer
