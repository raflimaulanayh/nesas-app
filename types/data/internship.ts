enum InternshipStatus {
  not_started = 'not_started',
  pending = 'pending',
  approved = 'approved',
  interviewing = 'interviewing',
  getted_kuota = 'getted_kuota',
  rejected = 'rejected',
  canceled = 'canceled',
  ongoing = 'ongoing',
  completed = 'completed',
  sidang_completed = 'sidang_completed'
}

interface TInternship {
  data: {
    company_id?: string
    start_date?: string
    end_date?: string
    status: InternshipStatus
    students?: string[]
  }[]
}

interface Internship {
  company_id?: string
  start_date?: string
  end_date?: string
  status: InternshipStatus
  students?: string[]
}

export type { TInternship, Internship }
