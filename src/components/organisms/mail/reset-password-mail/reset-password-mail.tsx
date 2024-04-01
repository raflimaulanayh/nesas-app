import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components'
import * as React from 'react'

interface ResetPasswordEmailProps {
  userFirstname?: string
  resetPasswordLink?: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : 'http://localhost:3000'

export const ResetPasswordEmail = ({ userFirstname, resetPasswordLink }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nesas Smart School reset password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`${baseUrl}/nss.png`} width="40" height="33" alt="Nesas Smart School" />
          <Section>
            <Text style={text}>Halo {userFirstname},</Text>
            <Text style={text}>
              Seseorang baru-baru ini meminta pengaturan ulang kata sandi untuk akun NSS Anda. Jika ini Anda, Anda dapat
              mengatur ulang kata sandi baru di sini:
            </Text>
            <Button style={button} href={resetPasswordLink}>
              Atur ulang kata sandi
            </Button>
            <Text style={text}>
              Jika Anda tidak ingin mengubah kata sandi atau tidak meminta ini, cukup abaikan dan hapus pesan ini.
            </Text>
            <Text style={text}>© Tim Nesas Smart School</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

ResetPasswordEmail.PreviewProps = {
  userFirstname: 'Siswa/i Nesas',
  resetPasswordLink: 'https://nss.nesas.tech'
} as ResetPasswordEmailProps

export default ResetPasswordEmail

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0'
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px'
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px'
}

const button = {
  backgroundColor: '#4338CA',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px'
}

// const anchor = {
//   textDecoration: 'underline'
// }
