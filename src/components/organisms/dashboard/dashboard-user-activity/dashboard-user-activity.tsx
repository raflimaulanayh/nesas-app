import useSWR from 'swr'

import { columns, UserActivities } from './data-table'

export const DashboardUserActivity = () => {
  const {
    data: usersActivities,
    isLoading: userActivitiesLoading,
    mutate: userActivitiesMutate
  } = useSWR('/user-activities')
  const dataUsersActivities = usersActivities?.data

  return (
    <UserActivities
      columns={columns}
      data={dataUsersActivities}
      isLoading={userActivitiesLoading}
      mutate={userActivitiesMutate}
    />
  )
}
