'use client'

import { useHydration } from '@/hooks/use-hydration'
import { LuUsers } from 'react-icons/lu'
import { PiChalkboardTeacherLight, PiStudent } from 'react-icons/pi'
import { SiGoogleclassroom } from 'react-icons/si'
import useSWR from 'swr'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/atoms/ui/card'
import { Skeleton } from '@/components/atoms/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/ui/tabs'
import { DashboardOverView } from '@/components/organisms/dashboard/dashboard-overview'
import { DashboardRecentActivity } from '@/components/organisms/dashboard/dashboard-recent-activity'
import { columns, UserActivities } from '@/components/organisms/dashboard/dashboard-user-activity/data-table'
import { AdminLayout } from '@/components/templates/admin-layout'

const DashboardPage = () => {
  const isHydrated = useHydration()

  const { data: users } = useSWR('/users')
  const dataUsers = users?.data

  const { data: students } = useSWR('/students')
  const dataStudents = students?.data

  const { data: teachers } = useSWR('/teachers')
  const dataTeachers = teachers?.data

  const { data: classes } = useSWR('/classes')
  const dataClasses = classes?.data

  const {
    data: usersActivities,
    isLoading: userActivitiesLoading,
    mutate: userActivitiesMutate
  } = useSWR('/user-activities')
  const dataUsersActivities = usersActivities?.data

  return (
    <AdminLayout>
      {!isHydrated && (
        <div className="flex-1 pb-10 space-y-4">
          <Skeleton className="h-8 w-36" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
            <Skeleton className="w-full h-36" />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Skeleton className="w-full h-[50vh]" />
            <Skeleton className="w-full h-[50vh]" />
          </div>
        </div>
      )}
      {isHydrated && (
        <div className="flex-1 pb-10 space-y-4">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Aktivitas user</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total User</CardTitle>
                    <LuUsers size={24} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{dataUsers?.length ?? '0'}</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
                    <PiChalkboardTeacherLight size={30} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{dataTeachers?.length ?? '0'}</div>
                    <p className="text-xs text-muted-foreground">+10% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                    <PiStudent size={27} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{dataStudents?.length ?? '0'}</div>
                    <p className="text-xs text-muted-foreground">+85% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
                    <SiGoogleclassroom size={24} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-semibold">{dataClasses?.length ?? '0'}</div>
                    <p className="text-xs text-muted-foreground">+50% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-y-4 xl:gap-4 md:grid-cols-2 xl:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {userActivitiesLoading ? (
                      <Skeleton className="w-full h-96" />
                    ) : (
                      <DashboardOverView data={dataUsersActivities} />
                    )}
                  </CardContent>
                </Card>
                <Card className="col-span-4 lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Aktivitas User Terbaru</CardTitle>
                    <CardDescription>
                      Ada {dataUsersActivities?.length ?? '0'} aktivitas terbaru pada bulan ini.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userActivitiesLoading ? (
                      <div className="space-y-2">
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                        <Skeleton className="w-full h-20" />
                      </div>
                    ) : (
                      <DashboardRecentActivity data={dataUsersActivities} />
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <UserActivities
                columns={columns}
                data={dataUsersActivities}
                isLoading={userActivitiesLoading}
                mutate={userActivitiesMutate}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </AdminLayout>
  )
}

export default DashboardPage
