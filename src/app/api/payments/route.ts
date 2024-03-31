/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { Payment } from 'types/data/payment'
import { z } from 'zod'

import { createPayment } from '@/lib/utils/db-utils/payments'
import prisma from '@/lib/utils/prisma'

enum PaymentStatus {
  paid = 'paid',
  unpaid = 'unpaid',
  installments = 'installments',
  refunded = 'refunded',
  canceled = 'canceled',
  pending = 'pending',
  failed = 'failed'
}

const createPaymentSchema = z
  .object({
    student_id: z.string(),
    payment_status: z.nativeEnum(PaymentStatus),
    total_price: z.number(),
    notes: z.optional(z.string()),
    categoryIds: z.array(z.string())
  })
  .strict()

function validatePaymentSchema(data: Payment) {
  try {
    const parseData = createPaymentSchema.parse(data)

    return parseData
  } catch (error: any) {
    if (error.issues && error.issues.length > 0) {
      const validationErrors = error.issues.map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
      throw new Error(JSON.stringify(validationErrors, null, 2))
    } else {
      throw new Error('Invalid Schema.')
    }
  }
}

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const validatedPayment = validatePaymentSchema(json)
    const createPaymentResult = await createPayment(validatedPayment)

    return NextResponse.json({ data: createPaymentResult }, { status: 200 })
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
    const payments = await prisma.payments.findMany({
      include: {
        categories: true
      }
    })

    return NextResponse.json({ data: payments }, { status: 200 })
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
