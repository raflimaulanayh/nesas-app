import api from '@/services/api'

export async function TrackUserActivity(
  identifier: string,
  type_activity: 'signin' | 'signout' | 'create' | 'update' | 'delete' | 'others',
  activity_detail?: string
) {
  try {
    const body = {
      identifier: identifier,
      type_activity: type_activity,
      activity_detail: activity_detail
    }
    const response = await api.post('/user-activities', body)
    if (response.status === 200) {
      console.log('User activity tracked successfully')
    }
  } catch (error) {
    console.error('Error tracking user activity:', error)
  }
}
