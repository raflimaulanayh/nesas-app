import prisma from '@/lib/utils/prisma'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    })

    return verificationToken
  } catch (error) {
    console.error('Error occurred while fetching verification token by token:', error)

    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { email }
    })

    return verificationToken
  } catch (error) {
    console.error('Error occurred while fetching verification token by email:', error)

    return null
  }
}
