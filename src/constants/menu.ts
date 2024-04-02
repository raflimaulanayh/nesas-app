import { MenuIcon } from 'lucide-react'
import { AiFillHome, AiOutlineReconciliation } from 'react-icons/ai'
import { BiSolidCctv } from 'react-icons/bi'
import { BsPersonWorkspace } from 'react-icons/bs'
import { FaHouseUser } from 'react-icons/fa6'
import { GrUserManager } from 'react-icons/gr'
import { HiAnnotation } from 'react-icons/hi'
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2'
import { IoInformationCircleSharp } from 'react-icons/io5'
import { LuUserCircle2 } from 'react-icons/lu'
import { MdOutlineArticle } from 'react-icons/md'
import { PiExam } from 'react-icons/pi'
import { RiArticleFill, RiCustomerService2Fill, RiMoneyDollarBoxLine } from 'react-icons/ri'
import { TbLayoutDashboard } from 'react-icons/tb'

export const navigationMore = [
  {
    url: '/',
    icon: IoInformationCircleSharp,
    label: 'Informasi'
  },
  {
    url: '/forum',
    icon: HiAnnotation,
    label: 'Forum'
  },
  {
    url: '/chatbot',
    icon: RiCustomerService2Fill,
    label: 'Chatbot'
  },
  {
    url: '/',
    icon: BiSolidCctv,
    label: 'CCTV'
  },
  {
    url: '/news',
    icon: RiArticleFill,
    label: 'Berita'
  },
  {
    url: '/',
    icon: IoInformationCircleSharp,
    label: 'Informasi'
  },
  {
    url: '/forum',
    icon: HiAnnotation,
    label: 'Forum'
  },
  {
    url: '/chatbot',
    icon: RiCustomerService2Fill,
    label: 'Chatbot'
  }
]

export const navigationGeneral = [
  {
    url: '/',
    icon: AiFillHome,
    label: 'Home'
  },
  {
    url: '/chatbot',
    icon: RiCustomerService2Fill,
    label: 'Chatbot'
  },
  {
    url: '/news',
    icon: RiArticleFill,
    label: 'Berita'
  },
  {
    url: '/contact',
    icon: HiAnnotation,
    label: 'Kontak'
  },
  {
    url: '#!',
    icon: RiArticleFill,
    label: 'Lainnya',
    childs: [
      {
        url: 'https://ppdb.jabarprov.go.id/',
        icon: RiArticleFill,
        label: 'PPDB'
      },
      {
        url: 'https://chat.whatsapp.com/IJ4wPOf14ZiLQjG7toalC5',
        icon: RiArticleFill,
        label: 'Forum'
      },
      {
        url: '#!',
        icon: RiArticleFill,
        label: 'Polling'
      },
      {
        url: '#!',
        icon: RiArticleFill,
        label: 'Ekstrakurikuler'
      }
    ]
  }
]

export const navigationAdmin = [
  { label: 'Dashboard', url: '/dashboard', icon: TbLayoutDashboard },
  { label: 'Berita', url: '/dashboard/news', icon: MdOutlineArticle },
  { label: 'Forum', url: '/dashboard/forum', icon: HiAnnotation },
  { label: 'PKL', url: '/dashboard/internship', icon: AiOutlineReconciliation },
  { label: 'Ujikom', url: '/dashboard/ujikom', icon: PiExam },
  { label: 'Pembayaran', url: '/dashboard/payment', icon: RiMoneyDollarBoxLine },
  {
    label: 'Lainnya',
    url: '#!',
    icon: MenuIcon,
    childs: [
      { label: 'User', url: '/dashboard/user', icon: LuUserCircle2 },
      { label: 'Guru', url: '/dashboard/teacher', icon: BsPersonWorkspace },
      { label: 'Siswa', url: '/dashboard/student', icon: GrUserManager },
      { label: 'Jurusan', url: '/dashboard/major', icon: HiOutlineWrenchScrewdriver },
      { label: 'Kelas', url: '/dashboard/class', icon: FaHouseUser },
      { label: 'K. Pembayaran', url: '/dashboard/payment-categories', icon: RiMoneyDollarBoxLine }
    ]
  }
]

export const navigationAdminMobile = [
  { label: 'Dashboard', url: '/dashboard', icon: TbLayoutDashboard },
  { label: 'Berita', url: '/dashboard/news', icon: MdOutlineArticle },
  { label: 'Forum', url: '/dashboard/forum', icon: HiAnnotation },
  {
    label: 'Lainnya',
    url: '#!',
    icon: MenuIcon,
    childs: [
      { label: 'PKL', url: '/dashboard/internship', icon: AiOutlineReconciliation },
      { label: 'Ujikom', url: '/dashboard/ujikom', icon: PiExam },
      { label: 'Pembayaran', url: '/dashboard/payment', icon: RiMoneyDollarBoxLine },
      { label: 'User', url: '/dashboard/user', icon: LuUserCircle2 },
      { label: 'Guru', url: '/dashboard/teacher', icon: BsPersonWorkspace },
      { label: 'Siswa', url: '/dashboard/student', icon: GrUserManager },
      { label: 'Jurusan', url: '/dashboard/major', icon: HiOutlineWrenchScrewdriver },
      { label: 'Kelas', url: '/dashboard/class', icon: FaHouseUser },
      { label: 'K. Pembayaran', url: '/dashboard/payment-categories', icon: RiMoneyDollarBoxLine }
    ]
  }
]
