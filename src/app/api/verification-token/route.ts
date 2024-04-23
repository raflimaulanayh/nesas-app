import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

import { sendVerificationEmail } from '@/lib/utils/mail'
import prisma from '@/lib/utils/prisma'
import { getVerificationTokenByEmail } from '@/lib/utils/prisma/verification-token'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const { email } = json

    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
      await prisma.verificationToken.delete({
        where: {
          id: existingToken.id
        }
      })
    }

    const createToken = await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires
      }
    })

    await sendVerificationEmail(email, token)

    return NextResponse.json({ data: createToken }, { status: 200 })
  } catch (error) {
    let errorMessage = 'Internal server error'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export const GET = async () => {
  try {
    const classes = await prisma.verificationToken.findMany()

    return NextResponse.json({ data: classes }, { status: 200 })
  } catch (error) {
    let errorMessage = 'Internal server error'
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
