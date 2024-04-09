import { usePathname } from 'next/navigation'
import { FaFacebookF } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share'

export const SocialShare = ({ title = '' }) => {
  const pathname = usePathname()
  const baseURL =
    typeof window !== 'undefined' ? `${title}${title !== '' ? '\n\n' : ''}${window.location.origin}${pathname}` : ''

  return (
    <div>
      <h2 className="font-medium mb-1.5">Share :</h2>
      <div className="flex items-center space-x-2">
        <FacebookShareButton url={baseURL}>
          <div className="p-2 rounded-full bg-primary">
            <FaFacebookF size={20} className="text-white" />
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={baseURL}>
          <div className="p-2 rounded-full bg-primary">
            <FaXTwitter size={20} className="text-white" />
          </div>
        </TwitterShareButton>
        <WhatsappShareButton url={baseURL}>
          <div className="p-2 rounded-full bg-primary">
            <IoLogoWhatsapp size={22} className="text-white" />
          </div>
        </WhatsappShareButton>
      </div>
    </div>
  )
}
