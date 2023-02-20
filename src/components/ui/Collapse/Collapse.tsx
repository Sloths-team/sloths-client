import { FC, ReactNode, memo, useReducer } from 'react'
import useMeasure from 'react-use-measure'
import { useSpring, a } from '@react-spring/web'

type Props = {
  title: string
  children?: ReactNode
}

const Collapse: FC<Props> = ({ title, children }) => {
  const [isActive, onToggle] = useReducer((x) => !x, false)
  const [ref, { height }] = useMeasure()

  const animProps = useSpring({
    height: isActive ? height : 0,
    config: { tension: 250, friction: 32, clamp: true, duration: 150 },
    opacity: isActive ? 1 : 0,
  })

  return (
    <div role="button" tabIndex={0} aria-expanded={isActive} onClick={onToggle}>
      <div className="s.header">{title}</div>
      <a.div style={{ ...animProps }}>
        <div ref={ref} className="s.content">
          {children}
        </div>
      </a.div>
    </div>
  )
}

export default memo(Collapse)
