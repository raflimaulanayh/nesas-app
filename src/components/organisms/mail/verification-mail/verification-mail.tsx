import { Body, Button, Container, Head, Html, Img, Preview, Section, Text } from '@react-email/components'
import * as React from 'react'

interface VerificationEmailProps {
  userFirstname?: string
  verficationLink?: string
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : 'http://localhost:3000'

export const VerificationEmail = ({ userFirstname, verficationLink }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verifikasi Email Akun Nesas Smart School</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={`${baseUrl}/nss.png`} width="120" height="39.65" alt="NSS" />
          <Section>
            <Text style={text}>Halo {userFirstname},</Text>
            <Text style={text}>
              Terima kasih telah mendaftar di Nesas Smart School! Untuk melengkapi proses pendaftaran Anda, kami perlu
              memverifikasi alamat email Anda.
            </Text>
            <Text style={text}>Silakan klik tombol di bawah ini untuk memverifikasi email Anda:</Text>
            <Button style={button} href={verficationLink}>
              Verifikasi Email
            </Button>
            <Text style={text}>
              Jika Anda tidak mendaftar untuk akun di Nesas Smart School, Anda bisa mengabaikan pesan ini. Namun, jika Anda
              merasa ini adalah kesalahan, silakan hubungi tim dukungan kami di{' '}
              {`${process.env.NEXT_PUBLIC_EMAIL_SUPPORT ?? 'nesas.technology@gmail.com'}`}
            </Text>
            <Text style={text}>© Tim Nesas Smart School</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

VerificationEmail.PreviewProps = {
  userFirstname: 'Siswa/i Nesas',
  verficationLink: 'https://nss.nesas.tech'
} as VerificationEmailProps

export default VerificationEmail

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
