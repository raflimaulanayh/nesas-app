/* eslint-disable @typescript-eslint/no-explicit-any */
enum UjikomStatus {
  not_started = 'not_started',
  pending_review = 'pending_review',
  approved = 'approved',
  revision = 'revision',
  rejected = 'rejected',
  canceled = 'canceled',
  ongoing = 'ongoing',
  completed = 'completed'
}

interface TUjikom {
  data: {
    project_name: string
    project_design?: any
    exam_date?: string
    room_number?: string
    status: UjikomStatus
    teacherIds?: string[]
    studentIds?: string[]
  }[]
}

interface Ujikom {
  project_name: string
  project_design?: any
  exam_date?: string
  room_number?: string
  status: UjikomStatus
  teacherIds?: string[]
  studentIds?: string[]
}

export type { Ujikom, TUjikom }
