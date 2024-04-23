import * as z from 'zod'

export const SettingsSchema = z
  .object({
    username: z.optional(z.string()),
    role: z.string(),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    {
      message: 'New password is required!',
      path: ['newPassword']
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false
      }

      return true
    },
    {
      message: 'Password is required!',
      path: ['password']
    }
  )

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum of 6 characters required'
  })
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  })
})

enum Genders {
  male = 'male',
  female = 'female'
}

const CommonFields = z.object({
  username: z.string().nonempty({ message: 'Username harus diisi' }),
  email: z
    .string()
    .nonempty({
      message: 'Email harus diisi'
    })
    .email({
      message: 'Email tidak valid'
    }),
  password: z
    .string()
    .nonempty({
      message: 'Password harus diisi'
    })
    .min(6, {
      message: 'Password minimal 6 karakter'
    }),
  birth_date: z.string().nonempty({ message: 'Tanggal lahir harus diisi' }),
  phone_number: z
    .string()
    .nonempty({ message: 'No. HP harus diisi' })
    .regex(/^[0-9]+$/)
    .min(10),
  address: z.optional(z.string().nonempty({ message: 'Alamat harus diisi' })),
  join_date: z.optional(z.string()),
  end_date: z.optional(z.string())
})

// Define schemas for each role
const StudentFields = z.object({
  ...CommonFields.shape,
  nis: z.string().nonempty({
    message: 'NIS harus diisi'
  }),
  nisn: z
    .string()
    .nonempty({ message: 'NISN harus diisi' })
    .regex(/^[0-9]+$/)
    .min(10),
  name: z.string().nonempty({
    message: 'Nama harus diisi'
  }),
  class_id: z.string().nonempty({
    message: 'Kelas harus diisi'
  }),
  gender: z.nativeEnum(Genders),
  graduate_status: z.string().nonempty({ message: 'Status lulus harus diisi' }),
  phone_number_parent: z
    .string()
    .nonempty({ message: 'No. HP orang tua/wali harus diisi' })
    .regex(/^[0-9]+$/)
    .min(10),
  proof: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

const TeacherFields = z.object({
  ...CommonFields.shape,
  nip: z.optional(z.string()),
  name: z.string().nonempty({
    message: 'Nama harus diisi'
  }),
  gender: z.nativeEnum(Genders),
  proof: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

const OfficerFields = z.object({
  ...CommonFields.shape,
  name: z.string().nonempty({
    message: 'Nama perusahaan harus diisi'
  }),
  contact: z.string().nonempty({
    message: 'Kontak harus diisi min. 1 kontak'
  }),
  leader_name: z.optional(
    z.string().nonempty({
      message: 'Nama pimpinan harus diisi'
    })
  ),
  majors: z.array(z.string().nonempty()).min(1, { message: 'Pilih minimal satu jurusan' }),
  quota: z.optional(z.string()),
  requirements: z.optional(z.string()),
  proof: z.optional(
    z.array(
      z.object({
        url: z.string()
      })
    )
  )
})

export const getRegisterSchema = (role: string) => {
  if (role === 'student') {
    return StudentFields
  } else if (role === 'teacher') {
    return TeacherFields
  } else if (role === 'officer') {
    return OfficerFields
  } else {
    console.error('Role not found!')

    return StudentFields
  }
}
