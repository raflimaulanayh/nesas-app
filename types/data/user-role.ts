interface TUserRole {
  data: {
    name: string
    permissionIds: string[]
  }[]
}

interface UserRole {
  name: string
  permissionIds: string[]
}

export type { UserRole, TUserRole }
