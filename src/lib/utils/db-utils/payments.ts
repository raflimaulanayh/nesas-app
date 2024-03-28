/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payment } from 'types/data/payment'

import prisma from '@/lib/utils/prisma-client'

export const createPayment = async (data: Payment) => {
  try {
    const categoryIds = data.categoryIds

    const categories = await prisma.paymentCategories.findMany({
      where: {
        id: { in: categoryIds }
      }
    })

    if (categories.length !== categoryIds.length) {
      throw new Error('One or more categories not found')
    }

    const result = await prisma.payments.create({
      data: {
        student: { connect: { id: data.student_id } },
        categories: { connect: categories.map((category) => ({ id: category.id })) },
        total_price: data.total_price,
        payment_status: data.payment_status,
        notes: data.notes
      },
      include: {
        categories: true
      }
    })

    return result
  } catch (error: any) {
    throw new Error(error.message)
  }
}
