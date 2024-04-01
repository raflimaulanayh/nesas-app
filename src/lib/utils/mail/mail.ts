import { Resend } from 'resend'

import { ResetPasswordEmail } from '@/components/organisms/mail/reset-password-mail'
import { VerificationEmail } from '@/components/organisms/mail/verification-mail'

const resend = new Resend('re_FMeCJW7h_A2MoiWyWRCc4u4o6J7Mk9y7f')

const domain = process.env.NEXT_PUBLIC_APP_URL

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`
  const emailParts = email.split('@')
  const username = emailParts[0]

  await resend.emails.send({
    from: 'Nesas Smart School <mail@nesas.tech>',
    to: email,
    reply_to: 'nesas.technology@gmail.com',
    subject: 'Reset password',
    react: ResetPasswordEmail({ userFirstname: username, resetPasswordLink: resetLink })
  })
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`
  const emailParts = email.split('@')
  const username = emailParts[0]

  await resend.emails.send({
    from: 'Nesas Smart School <mail@nesas.tech>',
    reply_to: 'nesas.technology@gmail.com',
    to: email,
    subject: 'Konfirmasi akun',
    react: VerificationEmail({ userFirstname: username, verficationLink: confirmLink })
  })
}
