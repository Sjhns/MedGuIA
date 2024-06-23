import axios from 'axios'

const API_TOKEN = process.env.API_TOKEN
const FROM = process.env.FROM_PHONE_NUMBER
const TO = process.env.PHONE_NUMBER


export const sendMessage = async (message: string) => {
  try {
    const response = await axios.post(
      'https://api.zenvia.com/v2/channels/whatsapp/messages',
      {
        from: FROM,
        to: TO,
        contents: [
          {
            type: 'text',
            text: message
          }
        ]
      },
      {
        headers: {
          'X-API-TOKEN': API_TOKEN
        }
      }
    )
    console.info('id:', response.data.id)
  } catch (error) {
    console.error('Error:', error)
  }
}
