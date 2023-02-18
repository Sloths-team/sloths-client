import { Inter } from '@next/font/google'
import { Layout } from '@components/common'
import { useRef, RefObject, useEffect } from 'react'
import { tabbable } from 'tabbable'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return <div>초기 설정</div>
}

Home.Layout = Layout
