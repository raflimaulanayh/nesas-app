enum AbsentStatus {
  present = 'present',
  absent = 'absent',
  sick = 'sick',
  permission = 'permission'
}

interface TAbsent {
  data: {
    student_id: string
    status: AbsentStatus
  }
}

interface Absent {
  student_id: string
  status: AbsentStatus
}

export type { Absent, TAbsent }
