'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs'
import cuid from 'cuid'

import prisma from '../prisma'
import { getStudentByNIS, getStudentByNISN } from '../prisma/student'
import { getTeacherByNIP } from '../prisma/teacher'
import { getUserByEmail, getUserById } from '../prisma/user'

export const register = async (values: any) => {
  const {
    username,
    email,
    password,
    role,
    nis,
    nisn,
    name,
    nip,
    class_id,
    gender,
    birth_date,
    phone_number,
    phone_number_parent,
    address,
    join_date,
    end_date,
    graduate_status,
    proof
  } = values

  let proofUrl: string | undefined
  if (proof && proof.length > 0) {
    proofUrl = proof[0]?.url
  }

  // Generate unique user ID
  let user_id: string
  let attemptCount = 0
  do {
    user_id = cuid()
    attemptCount++
  } while ((await getUserById(user_id)) && attemptCount < 3)

  if (attemptCount === 3) {
    return { error: 'Failed to generate unique ID.' }
  }

  // Check if email already exists
  const existingEmail = await getUserByEmail(email)
  if (existingEmail) {
    return { error: 'Email sudah digunakan oleh user lain.' }
  }

  // Role specific validation
  if (role === 'student') {
    // Check if NIS already exists
    const existingStudentNIS = await getStudentByNIS(nis)
    if (existingStudentNIS) {
      return { error: 'NIS tersebut sudah digunakan oleh siswa lain.' }
    }

    // Check if NISN already exists
    const existingStudentNISN = await getStudentByNISN(nisn)
    if (existingStudentNISN) {
      return { error: 'NISN tersebut sudah digunakan oleh siswa lain.' }
    }

    try {
      // Create user and student records
      await prisma.users.create({
        data: {
          id: user_id,
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role: 'student',
          accountComplete: true,
          active: true
        }
      })

      await prisma.students.create({
        data: {
          user_id,
          nis,
          nisn,
          name,
          class_id,
          gender,
          birth_date,
          phone_number,
          phone_number_parent,
          join_date,
          end_date,
          address,
          graduate_status,
          proof: proofUrl
        }
      })

      return {
        success: 'Akun berhasil diregistrasi, silahkan cek email untuk verifikasi akun!',
        role: role,
        redirectUrl: `/auth/register/success?name=${name || username}&role=${role}`
      }
    } catch (e) {
      console.error('Error:', e)
      await prisma.users.delete({
        where: { id: user_id }
      })

      return { error: 'Failed to create student account.' }
    }
  }

  if (role === 'teacher') {
    if (nip) {
      // Check if NIP already exists
      const existingTeacherNIP = await getTeacherByNIP(nip)
      if (existingTeacherNIP) {
        return { error: 'NIP tersebut sudah digunakan oleh guru lain.' }
      }
    }

    try {
      // Create user and teacher records
      await prisma.users.create({
        data: {
          id: user_id,
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role: 'teacher',
          accountComplete: true,
          active: false
        }
      })

      await prisma.teachers.create({
        data: {
          user_id,
          nip,
          name,
          gender,
          birth_date,
          phone_number,
          join_date,
          end_date,
          address,
          proof: proofUrl
        }
      })

      return {
        success: 'Akun berhasil diregistrasi, mohon tunggu kamu memverifikasi data anda terlebih dahulu.',
        redirectUrl: `/auth/register/success?name=${name || username}&role=${role}`
      }
    } catch (e: any) {
      console.error('Error', e.error)
      await prisma.users.delete({
        where: { id: user_id }
      })

      return { error: 'Failed to create teacher account.' }
    }
  }

  return { error: 'Invalid role specified.' }
}
