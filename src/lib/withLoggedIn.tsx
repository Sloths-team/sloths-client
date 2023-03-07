import { ComponentType, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '../components/common/Layout/context'

type Props = {}

export const withLoggedIn = <P extends Props>(
  WrappedComponent: ComponentType<P>
) => {
  const Component = (props: P) => {
    const { isUserLoggedIn } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!isUserLoggedIn) {
        router.push('/login')
      }
    }, [isUserLoggedIn])

    return <WrappedComponent {...props} />
  }

  Object.keys(WrappedComponent).forEach(
    (k) => ((Component as any)[k] = (WrappedComponent as any)[k])
  )

  return Component
}

export const withNotLoggedIn = <P extends Props>(
  WrappedComponent: ComponentType<P>
) => {
  const Component = (props: P) => {
    const { isUserLoggedIn } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (isUserLoggedIn) {
        router.push('/')
      }
    }, [isUserLoggedIn])

    return <WrappedComponent {...props} />
  }

  Object.keys(WrappedComponent).forEach(
    (k) => ((Component as any)[k] = (WrappedComponent as any)[k])
  )

  return Component
}
