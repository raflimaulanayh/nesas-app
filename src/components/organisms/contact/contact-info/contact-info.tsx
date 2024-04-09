import { MailIcon, PhoneIcon, SchoolIcon } from 'lucide-react'

export const ContactInfo = () => {
  return (
    <div className="relative px-4 py-14 lg:py-20 lg:static lg:px-8">
      <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-lg">
        <div className="absolute inset-y-0 left-0 w-full overflow-hidden bg-gray-100 -z-10 ring-1 ring-gray-900/10 lg:w-1/2">
          <svg
            className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="100%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="white" />
            <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
              <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" />
          </svg>
        </div>
        <h2 className="text-2xl font-medium tracking-tight text-primary lg:text-3xl">Hubungi Kami</h2>
        <p className="mt-3 leading-8 text-gray-600 lg:text-lg">
          Kami siap membantu Anda dengan segala pertanyaan dan informasi yang Anda butuhkan. Jangan ragu untuk menghubungi
          kami, kami akan dengan senang hati menjawab semua pertanyaan Anda.
        </p>
        <dl className="mt-10 space-y-4 text-base leading-7 text-slate-600">
          <div className="flex items-start gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Alamat</span>
              <SchoolIcon className="w-6 text-slate-400 h-7" aria-hidden="true" />
            </dt>
            <dd>
              <p className="mb-1">Jl. Mayor Abdurahman No.209, Kotakaler,</p>
              <p className="mb-1">Kec. Sumedang Utara, Kabupaten Sumedang,</p>
              <p className="mb-1">Jawa Barat 45323</p>
            </dd>
          </div>
          <div className="flex items-center gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Telepon</span>
              <PhoneIcon className="w-6 text-slate-400 h-7" aria-hidden="true" />
            </dt>
            <dd>
              <a target="_blank" className="hover:text-primary" href="tel:0261202056">
                0261-202-056
              </a>
            </dd>
          </div>
          <div className="flex items-center gap-x-4">
            <dt className="flex-none">
              <span className="sr-only">Email</span>
              <MailIcon className="w-6 text-slate-400 h-7" aria-hidden="true" />
            </dt>
            <dd>
              <a target="_blank" className="hover:text-primary" href="mailto:smkn1smd@gmail.com">
                smkn1smd@gmail.com
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
