import { FacebookIcon, InstagramIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/templates/container/container'

export const Footer = () => {
  return (
    <footer className="text-sm pb-16 lg:pb-0 bg-no-repeat text-center text-white sm:block bg-cover bg-center w-full sm:text-base bg-[url(/static/images/bg-navbar.png)]">
      <Container className="flex flex-col w-full py-7 gap-7">
        <div className="flex items-center justify-between gap-3">
          <Link target="_blank" href="https://nesas.tech">
            <Image src="/logo-tech-v2.svg" alt="Logo NSS" width={120} height={50} className="lg:w-32" />
          </Link>

          <ul className="flex items-center gap-2">
            <li>
              <Link target="_blank" href="https://www.instagram.com/smkn1sumedang.official">
                <InstagramIcon size={20} />
              </Link>
            </li>
            <li>
              <Link target="_blank" href="https://www.facebook.com/smknesas/">
                <FacebookIcon size={20} />
              </Link>
            </li>
            <li>
              <Link target="_blank" href="https://wa.me/685162522881">
                <PhoneIcon size={20} />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                href="https://www.google.com/maps/place/SMK+Negeri+1+Sumedang+(kampus+depan)/@-6.8376568,107.9274251,15z/data=!4m6!3m5!1s0x2e68d135ab91cee5:0xbbf00d892056f010!8m2!3d-6.8376568!4d107.9274251!16s%2Fg%2F1pzq19l_r?entry=ttu"
              >
                <MapPinIcon size={20} />
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-xs sm:text-base">&copy; {new Date().getFullYear()} SMKN 1 Sumedang. All rights reserved.</p>
      </Container>
    </footer>
  )
}
