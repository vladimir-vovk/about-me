#!/usr/bin/env node
import chalk from 'chalk'

const border = {
  top: '═',
  bottom: '═',
  left: '║',
  right: '║',
  topLeft: '╔',
  topRight: '╗',
  bottomLeft: '╚',
  bottomRight: '╝',
  color: chalk.yellow
}

function textLength(text) {
  const justText = text.replaceAll(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '')
  return justText.length
}

function maxWidth({ title, text, margin, padding }) {
  const widths = []
  widths.push(textLength(title))

  text.split('\n').forEach(line => widths.push(textLength(line)))
  return Math.max(...widths) + 2 * margin + 2 * padding
}

function repeatChar({ length, char }) {
  return Array.from({ length }).map(_ => char).join('')
}

function drawMargin(margin) {
  const result = repeatChar({ char: '\n', length: margin - 1 })
  console.log(result)
}

function drawPadding({ width, margin, padding }) {
  const marginStr = repeatChar({ length: margin, char: ' ' })
  const space = repeatChar({ length: width - 2, char: ' ' })
  const result = `${marginStr}${border.left}${space}${border.right}`
  for(let i = 0; i < padding - 1; i++) {
    console.log(border.color(result))
  }
}

function drawTitle({ title, width, margin, padding }) {
  const fc = border.color
  const bc = chalk.bgYellow

  const marginStr = repeatChar({ length: margin, char: ' ' })
  // leftBorder + space ... title ... space + rightBorder
  const borderWidth = width - 2 - 2 - title.length
  const leftBorderLength = Math.floor(borderWidth / 2)
  const rightBorderLength = borderWidth - leftBorderLength
  const leftStr = fc(repeatChar({ char: border.top, length: leftBorderLength }))
  const rightStr = fc(repeatChar({ char: border.top, length: rightBorderLength }))
  const [name, occupation] = title.split(' - ')
  const titleStr = `${fc(chalk.bold(name))} ${fc('-')} ${bc(occupation)}`
  const borderLeft = fc(border.topLeft)
  const borderRight = fc(border.topRight)

  const result = `${marginStr}${borderLeft}${leftStr} ${titleStr} ${rightStr}${borderRight}`
  console.log(result)
}

function drawBottom({ width, margin, padding }) {
  const fc = border.color
  const marginStr = repeatChar({ length: margin, char: ' ' })
  const borderStr = repeatChar({ length: width - 2, char: border.bottom})
  const result = `${marginStr}${fc(border.bottomLeft)}${fc(borderStr)}${fc(border.bottomRight)}`
  console.log(result)
}

function drawLine({ text, width, margin, padding }) {
  const fc = border.color
  const marginStr = repeatChar({ length: margin, char: ' ' })
  const paddingStr = repeatChar({ length: padding, char: ' ' })
  const spaceRight = width - 2 - paddingStr.length * 2 - textLength(text)
  const spaceStr = repeatChar({ length: spaceRight, char: ' ' })

  const result = `${marginStr}${fc(border.left)}${paddingStr}${text}${spaceStr}${paddingStr}${fc(border.right)}`
  console.log(result)
}

function drawText({ text, width, margin, padding }) {
  text.split('\n').forEach(line => drawLine({ text: line, width, margin, padding }))
}

function drawCard({ title, text, margin = 1, padding = 1 }) {

  const width = maxWidth({ title, text, margin, padding })
  drawMargin(margin)
  drawTitle({ title, width, margin, padding })
  drawPadding({ width, margin, padding })
  drawText({ text, width, margin, padding })
  drawPadding({ width, margin, padding })
  drawBottom({ width, margin, padding })
  drawMargin(margin)
}

const b = chalk.bold
const c = chalk.cyan

const title = 'Vladimir Vovk - Software Engineer'
const text = `
Hello world! 👋

I am passionate about the web and mobile technologies,
React Native, React, building beautiful user experiences,
and making the world a better place. 🤓

${b('Social links')}

GitHub    ${c('https://github.com/vladimir-vovk')}
LinkedIn  ${c('https://linkedin.com/in/vvovk')}
Twitter   ${c('https://twitter.com/vladimir_vovk')}
Telegram  ${c('https://t.me/vovk_vladimir')}

Blog      ${c('https://dev.to/vladimirvovk')}

─▄▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▄         ──────▄▀▄─────▄▀▄
█░░░█░░░░░░░░░░▄▄░██░█        ─────▄█░░▀▀▀▀▀░░█▄
█░▀▀█▀▀░▄▀░▄▀░░▀▀░▄▄░█        ─▄▄──█░░░░░░░░░░░█──▄▄
█░░░▀░░░▄▄▄▄▄░░██░▀▀░█        █▄▄█─█░░▀░░┬░░▀░░█─█▄▄█
─▀▄▄▄▄▄▀─────▀▄▄▄▄▄▄▀

${b('Experiments')}

Expo Template   ${c('https://github.com/vladimir-vovk/expo-ts')}
Cats Word Game  ${c('https://cats-word-game.vovk.in/')}
Fox-pet Game    ${c('https://vpet.vovk.in/')}
RN Collapsible  ${c('https://github.com/vladimir-vovk/collapsible')}
RN Toast        ${c('https://github.com/vladimir-vovk/react-native-toast')}

Find more on the GitHub... 😻
`

drawCard({ title, text })
