import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/templates/container/container'

export const LandingNews = () => {
  return (
    <section className="py-10">
      <Container className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Berita Utama</h2>

        <article className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="#!" className="hover:bg-slate-100">
            <figure className="flex items-center gap-3 py-5 border-b border-b-slate-300">
              <Image
                src="/static/images/landing/hero-slide-1.jpg"
                alt=""
                height={100}
                width={100}
                className="object-cover object-center w-24 h-24 overflow-hidden transition-all duration-300 rounded-lg group-hover:scale-105"
              />
              <figcaption className="space-y-1">
                <h3 className="font-semibold text-slate-900">MPLS tahun ajaran 2023</h3>
                <span className="text-sm text-gray-700">28 Maret 2024</span>
              </figcaption>
            </figure>
          </Link>

          <Link href="#!" className="hover:bg-slate-100">
            <figure className="flex items-center gap-3 py-5 border-b border-b-slate-300">
              <Image
                src="/static/images/landing/hero-slide-1.jpg"
                alt=""
                height={100}
                width={100}
                className="object-cover object-center w-24 h-24 overflow-hidden transition-all duration-300 rounded-lg group-hover:scale-105"
              />
              <figcaption className="space-y-1">
                <h3 className="font-semibold text-slate-900">MPLS tahun ajaran 2023</h3>
                <span className="text-sm text-gray-700">28 Maret 2024</span>
              </figcaption>
            </figure>
          </Link>

          <Link href="#!" className="hover:bg-slate-100">
            <figure className="flex items-center gap-3 py-5 border-b border-b-slate-300">
              <Image
                src="/static/images/landing/hero-slide-1.jpg"
                alt=""
                height={100}
                width={100}
                className="object-cover object-center w-24 h-24 overflow-hidden transition-all duration-300 rounded-lg group-hover:scale-105"
              />
              <figcaption className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-900">MPLS tahun ajaran 2023</h3>
                <span className="text-xs text-gray-700">28 Maret 2024</span>
              </figcaption>
            </figure>
          </Link>
        </article>
      </Container>
    </section>
  )
}
