import api from '@/services/api'

export const handleUpdateStatusComplete = async (user_id: string, role: string) => {
  const body = {
    accountComplete: true,
    role: role || 'student',
    active: role == 'teacher' ? false : true
  }

  let redirectTo: string
  if (role == 'student') {
    redirectTo = '/student'
  } else if (role == 'teacher') {
    redirectTo = '/auth/register/complete/teacher/success'
  }

  await api
    .put(`/users/${user_id}`, body)
    .then(({ status }) => {
      if (status == 200) {
        window.location.href = redirectTo
        console.log('Update Status Complete Account')
      }
    })
    .catch((e) => {
      console.error('Error update status complete account', e.error)
    })
}
