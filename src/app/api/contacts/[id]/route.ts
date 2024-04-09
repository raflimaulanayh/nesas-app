/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const contact = await prisma.contacts.findUnique({
      where: { id }
    })

    return NextResponse.json({ data: contact, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating contact:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { fullName, email, phoneNumber, subject, message } = data

    const updateContact = await prisma.contacts.update({
      where: { id },
      data: {
        fullName,
        email,
        phoneNumber,
        subject,
        message
      }
    })

    return NextResponse.json({ data: updateContact, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating contact:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteContact = await prisma.contacts.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteContact, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating contact:' + error, status: 500 })
  }
}
