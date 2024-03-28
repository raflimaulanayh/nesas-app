import Container from '@/components/templates/container/container'

export const Footer = () => {
  return (
    <footer className="hidden text-sm text-center text-white sm:block sm:text-base bg-primary">
      <Container className="w-full py-4">
        <p>&copy; {new Date().getFullYear()} SMKN 1 Sumedang. All rights reserved.</p>
      </Container>
    </footer>
  )
}
