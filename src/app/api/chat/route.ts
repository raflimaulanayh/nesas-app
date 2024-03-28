import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export async function POST(req: Request) {
  const body = await req.json()
  const messages = body.messages

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    messages
  })
  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
