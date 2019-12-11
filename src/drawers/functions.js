import {
  WIDTH,
  HEIGHT,
  TWO_PI,
  FONT_FAMILY,
  FONT_WEIGHT_BOLD,
  BACKGROUND_COLOR,
  CARD_COLOR,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_RADIUS,
  CARD_X,
  CARD_Y,
  USER_DISPLAY_NAME_FONT,
  USER_DISPLAY_NAME_COLOR,
  USER_DISPLAY_NAME_X,
  USER_DISPLAY_NAME_Y,
  USER_DISPLAY_NAME_WIDTH,
  USER_DISPLAY_NAME_TEXT_ALIGN,
  QUESTION_BODY_FONT,
  QUESTION_BODY_FONT_SIZE,
  QUESTION_BODY_WIDTH,
  QUESTION_BODY_HEIGHT,
  QUESTION_BODY_LINE_GUTTER,
  QUESTION_BODY_BASE_X,
  QUESTION_BODY_BASE_Y,
  QUESTION_BODY_COLOR,
  QUESTION_BODY_TEXT_ALIGN,
  QUESTION_BODY_MAX_LINES_LENGTH,
  QUESTION_SUB_BODY_FONT,
  QUESTION_SUB_BODY_WIDTH,
  QUESTION_SUB_BODY_TEXT_ALIGN,
  QUESTION_SUB_BODY_FONT_SIZE,
  QUESTION_SUB_BODY_BASE_X,
  QUESTION_SUB_BODY_BASE_Y,
  QUESTION_SUB_BODY_COLOR,
  QUESTION_SUB_BODY_MAX_LINES_LENGTH,
  QUESTION_SUB_BODY_LINE_GUTTER,
  ANSWER_BODY_FONT_SIZE,
  ANSWER_BODY_WIDTH,
  ANSWER_BODY_LINE_GUTTER,
  ANSWER_BODY_BASE_Y,
  ANSWER_BODY_HEIGHT,
  ANSWER_BODY_TEXT_ALIGN,
  ANSWER_BODY_FONT,
  ANSWER_BODY_COLOR,
  ANSWER_BODY_BASE_X
} from './constants'

export function measureTextWidth (text, fontFamily, fontWeight, fontSize) {
  var div = document.createElement('div')
  div.innerText = text
  div.style.fontFamily = fontFamily
  div.style.fontWeight = fontWeight
  div.style.fontSize = fontSize + 'px'
  div.style.position = 'fixed'
  div.style.top = '100%'
  div.style.visibility = 'hidden'
  div.style.whiteSpace = 'pre'
  document.body.appendChild(div)
  var width = div.offsetWidth
  div.remove()
  return width
}

export function textToLines (text, fontFamily, fontWeight, fontSize, maxWidth) {
  var lines = []
  var line = ''

  Array.from(text).forEach(function (c) {
    var lineWidth = measureTextWidth(line + c, fontFamily, fontWeight, fontSize)
    if (lineWidth > maxWidth) {
      lines.push(line)
      line = ''
    }
    line += c
  })

  lines.push(line)

  return lines
}

export function drawRoundedRect (ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x, y + r)
  ctx.arc(x + r, y + h - r, r, Math.PI, Math.PI * 0.5, true)
  ctx.arc(x + w - r, y + h - r, r, Math.PI * 0.5, 0, 1)
  ctx.arc(x + w - r, y + r, r, 0, Math.PI * 1.5, 1)
  ctx.arc(x + r, y + r, r, Math.PI * 1.5, Math.PI, 1)
  ctx.closePath()
}

export function drawCircle (ctx, cx, cy, r) {
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, TWO_PI, false)
  ctx.closePath()
}

export function initCanvas (canvas) {
  canvas.setAttribute('width', WIDTH)
  canvas.setAttribute('height', HEIGHT)
}

export function drawBackground (ctx) {
  ctx.fillStyle = BACKGROUND_COLOR
  ctx.fillRect(0, 0, WIDTH, HEIGHT)
}

export function drawCard (ctx) {
  ctx.fillStyle = CARD_COLOR
  drawRoundedRect(
    ctx,
    CARD_X,
    CARD_Y,
    CARD_WIDTH,
    CARD_HEIGHT,
    CARD_RADIUS
  )
  ctx.fill()
}

export function drawUser (ctx, user) {
  ctx.font = USER_DISPLAY_NAME_FONT
  ctx.fillStyle = USER_DISPLAY_NAME_COLOR
  ctx.textAlign = USER_DISPLAY_NAME_TEXT_ALIGN
  ctx.fillText(
    user.displayName,
    USER_DISPLAY_NAME_X,
    USER_DISPLAY_NAME_Y,
    USER_DISPLAY_NAME_WIDTH
  )
}

export function drawQuestion (ctx, question) {
  const body = question.body.replace(/\n/g, '')

  const lines = textToLines(
    body,
    FONT_FAMILY,
    FONT_WEIGHT_BOLD,
    QUESTION_BODY_FONT_SIZE,
    QUESTION_BODY_WIDTH
  ).slice(0, QUESTION_BODY_MAX_LINES_LENGTH)

  const length = lines.length
  const height = length * QUESTION_BODY_FONT_SIZE + (length - 1) * QUESTION_BODY_LINE_GUTTER
  var y = QUESTION_BODY_BASE_Y + (QUESTION_BODY_HEIGHT - height) / 2

  ctx.textAlign = QUESTION_BODY_TEXT_ALIGN
  ctx.font = QUESTION_BODY_FONT
  ctx.fillStyle = QUESTION_BODY_COLOR
  lines.forEach(line => {
    ctx.fillText(line, QUESTION_BODY_BASE_X, y, QUESTION_BODY_WIDTH)
    y += QUESTION_BODY_FONT_SIZE + QUESTION_BODY_LINE_GUTTER
  })
}

export function drawSubQuestion (ctx, question) {
  const body = question.body.replace(/\n/g, '')
  const lines = textToLines(
    body,
    FONT_FAMILY,
    FONT_WEIGHT_BOLD,
    QUESTION_SUB_BODY_FONT_SIZE,
    QUESTION_SUB_BODY_WIDTH
  ).slice(0, QUESTION_SUB_BODY_MAX_LINES_LENGTH)

  ctx.font = QUESTION_SUB_BODY_FONT
  ctx.textAlign = QUESTION_SUB_BODY_TEXT_ALIGN
  ctx.fillStyle = QUESTION_SUB_BODY_COLOR
  var y = QUESTION_SUB_BODY_BASE_Y
  lines.forEach(line => {
    ctx.fillText(line, QUESTION_SUB_BODY_BASE_X, y, QUESTION_SUB_BODY_WIDTH)
    y += QUESTION_SUB_BODY_FONT_SIZE + QUESTION_SUB_BODY_LINE_GUTTER
  })
}

export function drawAnswer (ctx, answer) {
  const body = answer.body.replace(/\n/g, '')

  const lines = textToLines(
    body,
    FONT_FAMILY,
    FONT_WEIGHT_BOLD,
    ANSWER_BODY_FONT_SIZE,
    ANSWER_BODY_WIDTH
  )

  const length = lines.length
  const height = length * ANSWER_BODY_FONT_SIZE + (length - 1) * ANSWER_BODY_LINE_GUTTER
  var y = ANSWER_BODY_BASE_Y + (ANSWER_BODY_HEIGHT - height) / 2

  ctx.textAlign = ANSWER_BODY_TEXT_ALIGN
  ctx.font = ANSWER_BODY_FONT
  ctx.fillStyle = ANSWER_BODY_COLOR
  lines.slice(0, 5).forEach(line => {
    ctx.fillText(line, ANSWER_BODY_BASE_X, y, ANSWER_BODY_WIDTH)
    y += ANSWER_BODY_FONT_SIZE + ANSWER_BODY_LINE_GUTTER
  })
}
