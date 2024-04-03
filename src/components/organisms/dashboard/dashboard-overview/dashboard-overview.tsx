'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { TUserActivity } from 'types/data/user-activity'

interface ActivityCountsPerMonth {
  [key: string]: number
}

export const DashboardOverView = ({ data }: TUserActivity) => {
  const processDataForChart = () => {
    if (!data) return []

    // Buat objek untuk menyimpan total aktivitas per bulan
    const activityCountsPerMonth: ActivityCountsPerMonth = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0
    }

    // Lakukan iterasi pada data aktivitas pengguna dan hitung total aktivitas per bulan
    data.forEach((activity) => {
      const date = new Date(activity.createdAt || '')
      const month = date.toLocaleString('id-ID', { month: 'short' })
      activityCountsPerMonth[month] += 1 // Misalnya, Anda dapat menghitung berapa banyak aktivitas yang terjadi setiap bulan
    })

    // Ubah objek menjadi array yang sesuai dengan format yang dibutuhkan oleh BarChart
    const dataForChart = Object.keys(activityCountsPerMonth).map((month) => ({
      name: month,
      total: Math.max(1, activityCountsPerMonth[month])
    }))

    return dataForChart
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={processDataForChart()}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
