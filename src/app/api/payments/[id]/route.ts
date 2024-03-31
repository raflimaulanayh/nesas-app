/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const payment = await prisma.payments.findUnique({
      where: { id },
      include: {
        categories: true
      }
    })

    return NextResponse.json({ data: payment, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating payment:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { student_id, categoriesIds, total_price, payment_date, payment_status, notes } = data

    const categoryIds = categoriesIds || []

    const existingCategories = await prisma.paymentCategories.findMany({
      where: {
        id: { in: categoryIds }
      }
    })

    if (existingCategories.length !== categoryIds.length) {
      throw new Error('One or more categories not found')
    }

    const updatedPayment = await prisma.payments.update({
      where: { id },
      data: {
        student: { connect: { id: student_id } },
        categories: { set: existingCategories.map((category) => ({ id: category.id })) },
        total_price,
        payment_date,
        payment_status,
        notes
      },
      include: {
        categories: true
      }
    })

    return NextResponse.json({ data: updatedPayment, status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: 'Error updating payment: ' + error.message, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteStudent = await prisma.payments.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteStudent, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating payment:' + error, status: 500 })
  }
}
