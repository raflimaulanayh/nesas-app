import majors from '@/shared/jsons/majors.json'
import Image from 'next/image'

import Container from '@/components/templates/container/container'

export const LandingMajor = () => {
  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-bold text-slate-900 mb-7">Daftar Jurusan</h2>
        <article className="grid grid-cols-2 gap-4 lg:gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {majors.map((item, index) => (
            <figure
              key={index}
              className="flex flex-col items-center h-full gap-2 px-4 text-center border border-dotted rounded shadow cursor-pointer py-7 lg:py-8 hover:bg-slate-100 border-slate-700"
            >
              <div className="relative p-6 rounded-full bg-slate-100">
                <Image src={item.image} alt="" width={60} height={60} className="sm:w-[70px] sm:h-[70px]" />
              </div>
              <figcaption>
                <h3 className="text-sm font-semibold text-slate-900 lg:text-base">{item.name}</h3>
              </figcaption>
            </figure>
          ))}
        </article>
      </Container>
    </section>
  )
}
