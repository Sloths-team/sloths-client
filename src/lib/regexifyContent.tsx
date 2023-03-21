import Link from 'next/link'
import React from 'react'

import regexifyString from 'regexify-string'

const regexifyContent = (
  content: string
): (string | JSX.Element)[] | JSX.Element => {
  const result = regexifyString({
    pattern: /#[^\s#]+|@[^\s@]+|http[^\shttp]+|https:[^\shttps]+|\n/g,
    decorator(match, index) {
      const social: string[] | null = match.match(
        /http[^\shttp]+|https[^\shttps]+/g
      )

      if (social) {
        return (
          <Link
            key={index}
            href={social[0]}
            style={{ color: '#1974e4', textDecoration: 'underline' }}
          >
            {social[0]}
          </Link>
        )
      }

      return <br key={index} />
    },
    input: content,
  })

  return result
}

export default regexifyContent
