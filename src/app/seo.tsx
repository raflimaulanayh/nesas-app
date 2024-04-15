export const HeadMetaData = () => {
  return (
    <head>
      <title>SMKN 1 Sumedang - NSS</title>
      <meta name="application-name" content="Nesas Smart School" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Nesas Smart School | SMKN 1 Sumedang" />
      <meta
        name="description"
        content="Nesas Smart School (NSS) adalah sebuah aplikasi inovatif yang dirancang khusus untuk memperkaya pengalaman belajar di SMK Negeri 1 Sumedang. Dengan fokus utama pada kenyamanan dan kemudahan, aplikasi ini memberikan akses cepat dan terpadu ke berbagai fitur yang mendukung kegiatan akademis dan kehidupan sekolah sehari-hari."
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content={`${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#4338ca" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
      />

      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/icon-32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/icon-16.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/icon-192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon/icon-512.png" />
      <link rel="manifest" href="/favicon/manifest.json" />
      <link rel="mask-icon" href="/favicon/apple-touch-icon.png" color="#4338ca" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:url" content={`${process.env.NEXT_PUBLIC_APP_URL}`} />
      <meta name="twitter:title" content="Nesas Smart School | SMKN 1 Sumedang" />
      <meta
        name="twitter:description"
        content="Nesas Smart School (NSS) adalah sebuah aplikasi inovatif yang dirancang khusus untuk memperkaya pengalaman belajar di SMK Negeri 1 Sumedang. Dengan fokus utama pada kenyamanan dan kemudahan, aplikasi ini memberikan akses cepat dan terpadu ke berbagai fitur yang mendukung kegiatan akademis dan kehidupan sekolah sehari-hari."
      />
      <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/favicon/icon-192.png`} />
      <meta name="twitter:creator" content="@raflimaulanayh" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Nesas Smart School | SMKN 1 Sumedang" />
      <meta
        property="og:description"
        content="Nesas Smart School (NSS) adalah sebuah aplikasi inovatif yang dirancang khusus untuk memperkaya pengalaman belajar di SMK Negeri 1 Sumedang. Dengan fokus utama pada kenyamanan dan kemudahan, aplikasi ini memberikan akses cepat dan terpadu ke berbagai fitur yang mendukung kegiatan akademis dan kehidupan sekolah sehari-hari."
      />
      <meta property="og:site_name" content="Nesas Smart School" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_APP_URL}`} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_APP_URL}/favicon/apple-touch-icon.png`} />
      <meta name="google-site-verification" content="Gqyqj8Wqz8mehjAJGwCS4suumemPh68xYpepJ3nLtbA" />
    </head>
  )
}
