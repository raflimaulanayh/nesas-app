import { subDays } from 'date-fns'
import { NextResponse } from 'next/server'
import { Params } from 'types/data/params'

import prisma from '@/lib/utils/prisma-client'

export async function GET(request: Request, { params }: Params) {
  try {
    const id = params.id

    const activities = await prisma.userActivities.findUnique({
      where: { id }
    })

    return NextResponse.json({ data: activities, message: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user activities:' + error, message: 500 })
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const data = await request.json()
    const id = params.id

    const { user_id, type_activity, activity_detail } = data

    const updateActivity = await prisma.userActivities.update({
      where: { id },
      data: {
        user_id,
        type_activity,
        activity_detail
      }
    })

    return NextResponse.json({ data: updateActivity, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating userActivity:' + error, status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    const deleteActivity = await prisma.userActivities.delete({
      where: { id }
    })

    return NextResponse.json({ data: deleteActivity, status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user:' + error, status: 500 })
  }
}

export async function PATCH() {
  try {
    const oneWeekAgo = subDays(new Date(), 7)
    await prisma.userActivities.deleteMany({
      where: {
        createdAt: {
          lte: oneWeekAgo
        }
      }
    })
    console.log('Old activities deleted successfully')
  } catch (error) {
    console.error('Error deleting old activities:', error)
  }
}
