import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/templates/container/container'

export const LandingArticle = () => {
  return (
    <section className="py-10">
      <Container className="space-y-4">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Artikel Utama</h2>
          <Link href="#!" className="inline-flex items-center text-sm font-semibold hover:text-primary text-slate-900">
            <span>Lihat artikel lainnya</span>
            <ChevronRight size={20} />
          </Link>
        </header>

        <article className="grid gap-x-5 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="#!" className="hover:bg-slate-100 group">
            <figure className="flex items-center gap-3 py-5 border-b rounded lg:px-5 border-b-slate-300">
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

          <Link href="#!" className="hover:bg-slate-100 group">
            <figure className="flex items-center gap-3 py-5 border-b rounded lg:px-5 border-b-slate-300">
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

          <Link href="#!" className="hover:bg-slate-100 group">
            <figure className="flex items-center gap-3 py-5 border-b rounded lg:px-5 border-b-slate-300">
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
