import { Telegraf } from 'telegraf'
import { welcomeMessage, helpMessage } from './scripts/messages'
import { escapeMarkdown } from './utils/escape-markdown'
import ollama from 'ollama'

const bot = new Telegraf(process.env.TOKEN_TELEGRAM_BOT ?? '')

bot.start((ctx) => {
  ctx.reply(welcomeMessage)
})

const escapedHelpMessage = escapeMarkdown(helpMessage)

bot.command('help', (ctx) => {
  ctx.replyWithMarkdownV2(escapedHelpMessage)
})

// use regex to match the message, se tiver a palavra lembrar, alarme, avise, notificar, enviar mensagem e emitindo que o bot envie uma mensagem de lembrete para o usuário em um determinado horário e data
bot.hears(/(lembrar|alarme|avise|notificar|enviar mensagem)/i, (ctx) => {
  console.log(ctx.message)
  ctx.reply(
    'Por favor, me informe o que deseja que eu lembre e a data e hora que deseja ser lembrado'
  )
})

// use regex to match the message, se tiver a palavra agendar, consulta, médico, exame, permitindo que o bot agende uma consulta médica para o usuário
bot.hears(/(agendar|consulta|médico|exame)/i, (ctx) => {
  ctx.reply('Por favor, me informe o tipo de consulta que deseja agendar')
})

// use regex to match the message, se tiver a palavra conselho, dica, sugestão, permitindo que o bot envie uma mensagem com conselhos personalizados para o usuário
bot.hears(/(conselho|dica|sugestão)/i, (ctx) => {
  ctx.reply(
    'Posso te ajudar com conselhos personalizados. O que deseja saber, mas saiba que sou apenas um assistente virtual e não um profissional de saúde real.'
  )
})

// Em breve, o bot poderá responder a mensagens com informações sobre como lidar com emergências médicas
// use regex to match the message, se tiver a palavra profissional, saúde, médico, enfermeiro, permitindo que o bot envie uma mensagem com informações sobre como agendar uma consulta com um profissional de saúde
// use regex to match the message, se tiver a palavra emergência, urgência, socorro, permitindo que o bot envie uma mensagem com informações sobre como lidar com emergências médicas


// Use regex to match the message, se tiver a palavra lia, permitindo que o bot envie uma mensagem para a API de IA para obter uma resposta
bot.hears(/(lia|LIA)/i, async (ctx) => {
  const text = ctx.message.text
  const user = ctx.message.from?.username

  console.log('Chatting with Ollama...')

  const response = await ollama.chat({
    model: 'lia',
    messages: [{ role: 'user', content: text }]
  })

  if (response.done) {
    ctx.reply(response.message.content)
    console.info(`Message sent to ${user}`)
  }
})

bot.launch(() => console.log('Bot is running'))
