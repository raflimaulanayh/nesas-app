'use client'

import { useHydration } from '@/hooks/use-hydration'
import { useIsDesktop } from '@/hooks/use-screen'
import { useChat } from 'ai/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { BiSend, BiTrash } from 'react-icons/bi'
import { MdChevronRight } from 'react-icons/md'
import Typewriter from 'typewriter-effect'

import { Loading } from '@/components/atoms/icons'
import { Avatar, AvatarImage } from '@/components/atoms/ui/avatar'
import { Input } from '@/components/atoms/ui/input'
import Container from '@/components/templates/container/container'

import { cn } from '@/lib/utils'

const QUESTIONS = [
  'Apa saja program keahlian atau jurusan yang tersedia di SMKN 1 Sumedang?',
  'Apa itu aplikasi Nesas Smart School?',
  'Bagaimana proses penerimaan siswa baru di SMKN 1 Sumedang?',
  'Berapa jumlah siswa dan siswi yang terdaftar di SMKN 1 Sumedang?',
  'Apa fasilitas utama yang tersedia di SMKN 1 Sumedang?',
  'Apakah SMKN 1 Sumedang memiliki program ekstrakurikuler?'
]

export function Chat() {
  const { data: session } = useSession()
  const isDesktop = useIsDesktop()
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat()

  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
    }
  }, [messages])

  const handleRecommendationQuestion = (question: string) => {
    setMessages([{ id: 'unique', role: 'user', content: question }])
  }

  const isHydrate = useHydration()
  if (!isHydrate)
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-sage">
        <Loading className="w-10 h-10 text-primary" />
      </div>
    )

  return (
    <div ref={scrollRef} className="flex flex-col justify-between w-full h-full overflow-y-auto lg:py-10">
      <div className="flex flex-col w-full h-full overflow-x-hidden">
        <Container className="flex flex-col w-full h-full pb-40 overflow-x-hidden lg:pb-10">
          {messages.length === 0 && (
            <div className="fixed flex flex-col items-center w-full gap-2 transform -translate-x-1/2 lg:w-auto left-1/2 top-32 sm:flex-row lg:top-40">
              <Image src="/bot.png" width={50} height={50} alt="Chat Bot" />
              <h2 className="w-full font-semibold text-center sm:text-lg sm:text-start lg:w-96 text-slate-900">
                <Typewriter
                  options={{
                    strings: [
                      'Halo, ada yang bisa saya bantu?',
                      'Silahkan pilih satu rekomendasi pertanyaan atau ajukan pertanyaan lain di form input!'
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 50
                  }}
                />
              </h2>
            </div>
          )}
          <AnimatePresence>
            {messages?.map((message, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: messages.indexOf(message) * 0.05 + 0.2
                  }
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5
                }}
                className={cn(
                  'flex flex-col gap-2 p-4 S whitespace-pre-wrap',
                  message.role !== 'assistant' ? 'items-end' : 'items-start'
                )}
              >
                <div className="flex flex-row-reverse items-start gap-3">
                  {message.role === 'user' && (
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage
                        className="rounded-full"
                        src={session?.user?.photo ?? '/static/icons/user-v2.png'}
                        alt={message.role}
                        width={60}
                        height={60}
                      />
                    </Avatar>
                  )}
                  <span
                    className={cn(
                      message.role !== 'user'
                        ? 'rounded-md rounded-tl-none bg-accent'
                        : 'rounded-md rounded-tr-none bg-primary text-white',
                      'p-3 max-w-xs text-sm sm:text-base'
                    )}
                  >
                    {message.content}
                  </span>
                  {message.role !== 'user' && (
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage src="/bot.png" alt={message.role} width={60} height={60} />
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </Container>

        <div className="fixed bottom-[70px] sm:bottom-0 w-full lg:space-y-2">
          {messages.length == 0 && (
            <div className="px-2 py-4">
              <Container>
                <ul className="grid gap-4 lg:grid-cols-3">
                  {QUESTIONS.slice(0, !isDesktop ? 2 : 6).map((question, index) => (
                    <li
                      key={index}
                      onClick={() => handleRecommendationQuestion(question)}
                      className="flex items-center gap-2 p-3 text-sm transition-all bg-white rounded shadow cursor-pointer text-slate-900 sm:text-base sm:p-4 hover:bg-primary hover:text-white"
                    >
                      <span className="w-11/12">{question}</span>
                      <MdChevronRight size={35} className="size-5 sm:size-9" />
                    </li>
                  ))}
                </ul>
              </Container>
            </div>
          )}

          {/* Input Bar */}
          <div className="px-2 py-4 bg-white">
            <Container className="flex items-center justify-between">
              <AnimatePresence initial={false}>
                <motion.div
                  key="input"
                  className="relative w-full"
                  layout
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{
                    opacity: { duration: 0.05 },
                    layout: {
                      type: 'spring',
                      bounce: 0.15
                    }
                  }}
                >
                  <form onSubmit={(e) => handleSubmit(e)} className="flex items-center gap-x-2">
                    {messages.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setMessages([])}
                        className="bg-red-700 text-white p-[11px] rounded-md"
                      >
                        <BiTrash />
                      </button>
                    )}
                    <Input
                      value={input}
                      ref={inputRef}
                      onChange={handleInputChange}
                      name="message"
                      placeholder="Hi Nebot!"
                      className="block w-full py-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-700 sm:text-sm sm:leading-6"
                    />
                    <button type="submit" className="bg-indigo-700 text-white p-[11px] rounded-md">
                      <BiSend />
                    </button>
                  </form>
                </motion.div>
              </AnimatePresence>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}
