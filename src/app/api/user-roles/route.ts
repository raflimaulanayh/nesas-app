/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { UserRole } from 'types/data/user-role'
import z from 'zod'

import { createUserRole } from '@/lib/utils/db-utils/user-roles'
import prisma from '@/lib/utils/prisma-client'

const createUserRoleSchema = z
  .object({
    name: z.string(),
    permissionIds: z.array(z.string())
  })
  .strict()

function validateUserRoleSchema(data: UserRole) {
  try {
    const parseData = createUserRoleSchema.parse(data)

    return parseData
  } catch (error: any) {
    if (error.issues && error.issues.length > 0) {
      const validationErrors = error.issues.map((issue: any) => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
      throw new Error(JSON.stringify(validationErrors, null, 2))
    } else {
      throw new Error('Invalid Schema.')
    }
  }
}

export const POST = async (request: Request) => {
  try {
    const json = await request.json()
    const validatedUserRole = validateUserRoleSchema(json)
    const createUserRoleResult = await createUserRole(validatedUserRole)

    return NextResponse.json(
      {
        data: createUserRoleResult
      },
      { status: 200 }
    )
  } catch (error: any) {
    let errorMessage
    try {
      errorMessage = JSON.parse(error.message)
    } catch (parseError) {
      errorMessage = error.message
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

export async function GET() {
  try {
    const userRoles = await prisma.userRoles.findMany()

    return NextResponse.json({ data: userRoles }, { status: 200 })
  } catch (error) {
    let errorMessage
    if (error instanceof Error) {
      errorMessage = error.message
    } else {
      errorMessage = 'Internal server error'
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
