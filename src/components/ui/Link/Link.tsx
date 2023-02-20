import NextLink, { LinkProps } from 'next/link'
import { FC, ReactNode } from 'react'

type Props = LinkProps & {
  children?: ReactNode
}

const Link: FC<Props> = ({ href, children }) => {
  return <NextLink href={href}>{children}</NextLink>
}

export default Link
