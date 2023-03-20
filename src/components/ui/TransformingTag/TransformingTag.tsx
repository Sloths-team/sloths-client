import React, { useState } from 'react'
import { TbEdit } from 'react-icons/tb'

type Props = {
  from: keyof React.ReactHTML
  into: keyof React.ReactHTML
  children?: React.ReactNode
  value?: string
}

const TransformingTag = (props: Props) => {
  const { from, into, children, value } = props
  const [tagName, setTagName] = useState<{
    from: keyof React.ReactHTML
    into: keyof React.ReactHTML
  }>({ from, into })

  const toggle = () => {
    setTagName((prev) => {
      const { from, into } = prev
      return { from: into, into: from }
    })
  }

  const valueIsNeeded = (tag: keyof React.ReactHTML) => {
    return ['input', 'textara'].includes(tag)
  }

  return React.createElement(
    tagName.from,
    {
      onClick: toggle,
      defaultValue: valueIsNeeded(tagName.from) ? value : null,
    },
    valueIsNeeded(tagName.from) ? null : children,
    <span>
      <TbEdit />
    </span>
  )
}

export default TransformingTag
