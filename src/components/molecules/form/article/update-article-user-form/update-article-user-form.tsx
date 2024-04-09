'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import api from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import { Params } from 'types/data/params'
import { z } from 'zod'

import { FileUploads } from '@/components/atoms/form-file-upload'
import { Input } from '@/components/atoms/form-input'
import { RichText } from '@/components/atoms/form-rich-text'
import { Select } from '@/components/atoms/form-select'
import { Loading } from '@/components/atoms/icons'
import { Button } from '@/components/atoms/ui/button'
import { Form } from '@/components/atoms/ui/form'
import { toast } from '@/components/atoms/ui/use-toast'

import { TrackUserActivity } from '@/lib/utils/actions/user-activity'

import { CATEGORY_OPTIONS } from '../data-options'
import { defaultValues, formSchema } from '../schema'

export const ArticleUpdateUserForm = ({ params }: Params) => {
  const user = useCurrentUser()
  const [loading, setLoading] = useState(false)
  const { data: article, isLoading: loadArticle } = useSWR(`/articles/${params.id}`)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    let pictureUrl: string | undefined
    if (values.picture && values.picture.length > 0) {
      pictureUrl = values.picture[0]?.url
    }

    const body = {
      title: values.title,
      description: values.description,
      content: values.content,
      category: values.category,
      keyword: values.keyword,
      writer_name: values.writer_name,
      picture: pictureUrl,
      user_id: user?.id || ''
    }

    await api
      .put(`/articles/${params.id}`, body)
      .then(({ status }) => {
        if (status == 200) {
          toast({
            title: 'Berhasil!',
            description: 'Selamat, artikel telah berhasil diupdate.'
          })
          TrackUserActivity(user?.email ?? '', 'update', 'Mengupdate artikel : ' + body.title ?? '')

          setTimeout(() => {
            setLoading(false)
            window.location.href = '/student/article'
          }, 2000)
        }
      })
      .catch((e) => {
        setLoading(false)
        console.error('Error', e.error)
        toast({
          title: 'Gagal diupdate!',
          description: 'Maaf, terjadi kesalahan!',
          variant: 'destructive'
        })
      })
  }

  useEffect(() => {
    if (article?.data) {
      form.setValue('title', article?.data?.title || '')
      form.setValue('description', article?.data?.description || '')
      form.setValue('content', article?.data?.content || '')
      form.setValue('category', article?.data?.category || '')
      form.setValue('keyword', article?.data?.keyword || '')
      form.setValue('writer_name', article?.data?.writer_name || '')
    }
  }, [article, form])

  return (
    <Form {...form}>
      {loadArticle && (
        <div className="flex justify-center w-full h-screen py-20">
          <Loading className="w-12 h-12" />
        </div>
      )}
      {!loadArticle && (
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-4">
            <Input name="title" label="Judul" placeholder="Masukan judul" {...form} required />
            <Input name="description" label="Deskripsi" placeholder="Masukan deskripsi" {...form} required />
            <FileUploads name="picture" label="Thumbnail" {...form} required />
            <RichText defaultValue={article?.data?.content} name="content" label="Konten" required />
            <Select name="category" label="Kategori" placeholder="Pilih kategori" option={CATEGORY_OPTIONS} {...form} />
            <Input
              hint="Contoh: key1, key2, key3 (pisahkan dengan koma)"
              name="keyword"
              label="Keyword"
              placeholder="Masukan keyword"
              {...form}
            />
            {/* <Select name="status" label="Status" placeholder="Pilih status" option={STATUS_OPTIONS} {...form} /> */}
            <Input name="writer_name" label="Nama penulis" placeholder="Masukan nama penulis" {...form} />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {loading ? <Loading /> : 'Update'}
          </Button>
        </form>
      )}
    </Form>
  )
}
