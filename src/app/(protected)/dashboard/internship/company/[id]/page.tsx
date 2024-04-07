'use client'

import { Params } from 'types/data/params'

import { InternshipCompanyViewDetail } from '@/components/organisms/internship/internship-company-view-detail'
import { AdminLayout } from '@/components/templates/admin-layout'

const DetailCompanyPage = ({ params }: Params) => {
  return (
    <AdminLayout>
      <InternshipCompanyViewDetail params={params} />
    </AdminLayout>
  )
}

export default DetailCompanyPage
