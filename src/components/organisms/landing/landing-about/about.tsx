import overview from '@/shared/jsons/overview.json'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Container from '@/components/templates/container/container'

export const LandingAbout = () => {
  return (
    <section className="w-full h-full">
      <article className="relative z-20 flex justify-end -mt-10">
        <div className="py-10 bg-primary rounded-l-[2rem] rounded-t-none w-full sm:w-10/12 self-end h-full">
          <Container className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {overview.map((item, index) => (
              <div key={index} className="space-y-1">
                <h2 className="text-xl font-bold text-white">{item.title}</h2>
                <p className="text-sm text-slate-200 lg:text-base">{item.description}</p>
              </div>
            ))}
          </Container>
        </div>
      </article>

      <article className="py-10">
        <Container className="flex flex-col sm:items-center sm:flex-row gap-7 lg:gap-10">
          <div className="space-y-4 sm:w-8/12">
            <h2 className="text-2xl font-bold text-slate-900">Nesas Smart School</h2>
            <p className="text-sm text-justify text-slate-800 lg:text-base">
              Nesas Smart School (NSS) adalah sebuah aplikasi inovatif yang dirancang khusus untuk memperkaya pengalaman
              belajar di SMK Negeri 1 Sumedang.
              <br />
              <br />
              Dengan fokus utama pada kenyamanan dan kemudahan, aplikasi ini memberikan akses cepat dan terpadu ke berbagai
              fitur yang mendukung kegiatan akademis dan kehidupan sekolah sehari-hari.
            </p>
            <Link href="#!" className="inline-flex items-center font-semibold hover:text-primary text-slate-900">
              <span>Selengkapnya</span>
              <ChevronRight size={20} />
            </Link>
          </div>
          <Image src="/static/images/about.png" alt="About Photo" width={400} height={400} className="sm:w-4/12" />
        </Container>
      </article>
    </section>
  )
}
