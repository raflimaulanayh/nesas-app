export enum PaymentStatus {
  paid = 'paid',
  unpaid = 'unpaid',
  installments = 'installments',
  refunded = 'refunded',
  canceled = 'canceled',
  pending = 'pending',
  failed = 'failed'
}

interface TPayment {
  data: {
    student_id: string
    total_price: number
    payment_date?: string
    payment_status: PaymentStatus
    notes?: string
    categoryIds: string[]
    createdAt?: string
  }[]
}

interface TPaymentCategories {
  data: {
    id: string
    name: string
    price: number
    year: number
  }[]
}

interface Payment {
  student_id: string
  total_price: number
  payment_date?: string
  payment_status: PaymentStatus
  notes?: string
  categoryIds: string[]
  createdAt?: string
}

export type { Payment, TPayment, TPaymentCategories }
