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
    identifier: string
    type_activity: TypeUserActivity
    activity_detail?: string
    createdAt?: string
  }[]
}

interface UserActivity {
  identifier: string
  type_activity: TypeUserActivity
  activity_detail?: string
  createdAt?: string
}

export type { UserActivity, TUserActivity }
