import api from '@/services/api'

export async function TrackUserActivity(
  user_id: string,
  type_activity: 'signin' | 'signout' | 'create' | 'update' | 'delete' | 'others',
  activity_detail?: string
) {
  try {
    const body = {
      user_id: user_id,
      type_activity: type_activity,
      activity_detail: activity_detail
    }
    const response = await api.post('/api/user-activities', body)
    if (response.status === 200) {
      console.log('User activity tracked successfully')
    }
  } catch (error) {
    console.error('Error tracking user activity:', error)
  }
}
