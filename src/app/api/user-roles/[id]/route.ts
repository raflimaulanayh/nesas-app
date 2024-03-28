import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma-client'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const user = await prisma.userRoles.findUnique({
      where: { id }
    })

    return NextResponse.json({ data: user, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { name } = data

    if (name) {
      const existingEmail = await prisma.userRoles.findUnique({
        where: { name: name }
      })

      if (existingEmail) {
        throw new Error('Role is already taken.')
      }
    }

    const updatedUser = await prisma.userRoles.update({
      where: { id },
      data: {
        name
      }
    })

    return NextResponse.json({ data: updatedUser, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteUser = await prisma.userRoles.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteUser, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user:' + error, status: 500 })
  }
}
