/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

import prisma from '@/lib/utils/prisma'

export const POST = async (request: Request) => {
  try {
    const json = await request.json()

    const { fullName, email, phoneNumber, subject, message } = json

    const createArticle = await prisma.contacts.create({
      data: {
        fullName,
        email,
        phoneNumber,
        subject,
        message
      }
    })

    return NextResponse.json({ data: createArticle }, { status: 200 })
  } catch (error: any) {
    let errorMessage
    try {
      errorMessage = JSON.parse(error.message)
    } catch (parseError) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contacts.findMany()

    return NextResponse.json({ data: contacts }, { status: 200 })
  } catch (error) {
    let errorMessage
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'Internal server error'
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
