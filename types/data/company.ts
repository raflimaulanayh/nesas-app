enum CompanyStatus {
  active = 'active',
  not_active = 'not_active'
}

interface TCompanyInternship {
  data: {
    id?: string
    name: string
    address?: string
    contact?: string
    leader_name?: string
    status: CompanyStatus
    quota?: number
    requirements?: string
    signature?: string
    majors: string[]
  }[]
}

interface CompanyInternship {
  id?: string
  name: string
  address?: string
  contact?: string
  leader_name?: string
  status: CompanyStatus
  quota?: number
  requirements?: string
  signature?: string
  majors: string[]
}

export type { CompanyInternship, TCompanyInternship }
