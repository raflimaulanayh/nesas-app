import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma-client'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        teachers: true,
        students: true,
        userRoles: true
      }
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

    const { username, email, role_id, photo } = data

    const existingUser = await prisma.users.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found', status: 500 })
    }

    if (email) {
      const existingEmail = await prisma.users.findUnique({
        where: { email: email }
      })

      if (existingEmail && existingEmail.id !== id) {
        throw new Error('Email is already taken.')
      }
    }

    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        username,
        email,
        role_id,
        photo
      },
      include: {
        teachers: true,
        students: true,
        userRoles: true
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

    const deleteUser = await prisma.users.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteUser, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user:' + error, status: 500 })
  }
}
