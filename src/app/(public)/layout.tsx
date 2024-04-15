import { SplashScreen } from '@/components/molecules/splashscreen'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <SplashScreen />
      {children}
    </main>
  )
}
