export enum TypeUserActivity {
  signin = 'signin',
  signout = 'signout',
  create = 'create',
  update = 'update',
  delete = 'delete',
  others = 'others'
}

interface TUserActivity {
  data: {
    user_id: string
    type_activity: TypeUserActivity
    activity_detail?: string
  }[]
}

interface UserActivity {
  user_id: string
  type_activity: TypeUserActivity
  activity_detail?: string
}

export type { UserActivity, TUserActivity }
