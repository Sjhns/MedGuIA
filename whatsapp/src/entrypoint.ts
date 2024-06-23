import express, { Router, Request, Response } from 'express'
import { sendMessage } from './use-cases/send-message'
import ollama from 'ollama'

const app = express()

const route = Router()

app.use(express.json())

const PORT = process.env.PORT

route.get('/', (req: Request, res: Response) => {
  res.send('Server running')
})

route.post('/lia', async (req: Request, res: Response) => {
  const contact = req.body.message.visitor
  const message = req.body.message.contents[0].text

  const response = await ollama.chat({
    model: 'lia',
    messages: [{ role: 'user', content: message }]
  })

  console.log(response)

  if (response.done) {
    sendMessage(response.message.content)
    console.info(`Message sent: ${response.message.content} to ${contact.name}`)
  }

  res.status(200).end()
})

app.use(route)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
