import { Contact2Icon, MenuIcon } from 'lucide-react'
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
import { RiArticleFill, RiCustomerService2Fill } from 'react-icons/ri'
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
    url: '/article',
    icon: RiArticleFill,
    label: 'Artikel'
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
    url: '/contact',
    icon: HiAnnotation,
    label: 'Kontak'
  },
  {
    url: '#!',
    icon: MenuIcon,
    label: 'Lainnya',
    childs: [
      {
        url: '/article',
        icon: RiArticleFill,
        label: 'Artikel'
      },
      {
        url: '/forum',
        icon: RiArticleFill,
        label: 'Forum'
      },
      {
        url: 'https://ppdb.jabarprov.go.id/',
        icon: RiArticleFill,
        label: 'PPDB'
      }
      // {
      //   url: '#!',
      //   icon: RiArticleFill,
      //   label: 'Ekstrakurikuler'
      // }
    ]
  }
]

export const navigationAdmin = [
  { label: 'Dashboard', url: '/dashboard', icon: TbLayoutDashboard },
  { label: 'Kontak', url: '/dashboard/contact', icon: Contact2Icon },
  { label: 'Artikel', url: '/dashboard/article', icon: MdOutlineArticle },
  { label: 'Forum', url: '/dashboard/forum', icon: HiAnnotation },
  { label: 'PKL', url: '/dashboard/internship', icon: AiOutlineReconciliation },
  // { label: 'Pembayaran', url: '/dashboard/payment', icon: RiMoneyDollarBoxLine },
  {
    label: 'Lainnya',
    url: '#!',
    icon: MenuIcon,
    childs: [
      { label: 'User', url: '/dashboard/user', icon: LuUserCircle2 },
      { label: 'Guru', url: '/dashboard/teacher', icon: BsPersonWorkspace },
      { label: 'Siswa', url: '/dashboard/student', icon: GrUserManager },
      { label: 'Jurusan', url: '/dashboard/major', icon: HiOutlineWrenchScrewdriver },
      { label: 'Kelas', url: '/dashboard/class', icon: FaHouseUser }
    ]
  }
]

export const navigationAdminMobile = [
  { label: 'Dashboard', url: '/dashboard', icon: TbLayoutDashboard },
  { label: 'Kontak', url: '/dashboard/contact', icon: Contact2Icon },
  { label: 'Artikel', url: '/dashboard/article', icon: MdOutlineArticle },
  {
    label: 'Lainnya',
    url: '#!',
    icon: MenuIcon,
    childs: [
      { label: 'Forum', url: '/dashboard/forum', icon: HiAnnotation },
      { label: 'PKL', url: '/dashboard/internship', icon: AiOutlineReconciliation },
      { label: 'User', url: '/dashboard/user', icon: LuUserCircle2 },
      { label: 'Guru', url: '/dashboard/teacher', icon: BsPersonWorkspace },
      { label: 'Siswa', url: '/dashboard/student', icon: GrUserManager },
      { label: 'Jurusan', url: '/dashboard/major', icon: HiOutlineWrenchScrewdriver },
      { label: 'Kelas', url: '/dashboard/class', icon: FaHouseUser }
    ]
  }
]

export const navigationStudent = [
  { label: 'Overview', url: '/student', icon: TbLayoutDashboard },
  { label: 'Forum', url: '/forum', icon: MdOutlineArticle },
  { label: 'PKL', url: '/student/internship', icon: HiAnnotation },
  {
    label: 'Lainnya',
    url: '#!',
    icon: MenuIcon,
    childs: [
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
        url: '/article',
        icon: RiArticleFill,
        label: 'Artikel'
      },
      {
        url: '/contact',
        icon: HiAnnotation,
        label: 'Kontak'
      },
      {
        url: '/student/settings',
        icon: HiAnnotation,
        label: 'Pengaturan'
      }
    ]
  }
]
