enum InternshipStatus {
  not_started = 'not_started',
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
  canceled = 'canceled',
  ongoing = 'ongoing',
  completed = 'completed'
}

interface TInternship {
  data: {
    company_id?: string
    start_date?: string
    end_date?: string
    status: InternshipStatus
    studentIds?: string[]
  }[]
}

interface Internship {
  company_id?: string
  start_date?: string
  end_date?: string
  status: InternshipStatus
  studentIds?: string[]
}

export type { TInternship, Internship }
