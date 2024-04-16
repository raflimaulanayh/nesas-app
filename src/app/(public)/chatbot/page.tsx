import { Chat } from '@/components/organisms/chatbot'
import { SiteLayout } from '@/components/templates/site-layout'

export const metadata = {
  title: 'Chatbot'
}

const ChatBotPage = () => {
  return (
    <SiteLayout title="Chatbot">
      <Chat />
    </SiteLayout>
  )
}

export default ChatBotPage
