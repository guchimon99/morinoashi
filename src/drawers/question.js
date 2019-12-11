import {
  initCanvas,
  drawBackground,
  drawCard,
  drawUser,
  drawQuestion
} from './functions'

function questionDrawer (canvas, user, question) {
  initCanvas(canvas)
  const ctx = canvas.getContext('2d')
  drawBackground(ctx)
  drawCard(ctx)
  drawUser(ctx, user)
  drawQuestion(ctx, question)
}

export default questionDrawer
