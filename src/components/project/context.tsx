import { REPO_NAME } from '@lib/constants'
import useLocalStorage from '@lib/hooks/useLocalStorage'
import React, {
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from 'react'

export type State = {
  repo_url: string
}

export type ContextValue = State & {
  setRepoUrl: (url: string) => void
}

const initialState: State = {
  repo_url: '',
}

type Action = {
  type: 'SET'
  url: string
}

export const ProjectContext = createContext<ContextValue | null>(null)

ProjectContext.displayName = 'ProjectContext'

function projectReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET': {
      return {
        ...state,
        repo_url: action.url,
      }
    }

    default: {
      return { ...state }
    }
  }
}

export const ProjectProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)
  const { storage, saveStorage } = useLocalStorage(REPO_NAME)

  const setRepoUrl = useCallback(
    (url: string) => {
      dispatch({ type: 'SET', url })
      saveStorage(url)
    },
    [dispatch]
  )

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      setRepoUrl,
    }),
    [state]
  )

  useEffect(() => {
    if (storage) {
      setRepoUrl(storage)
    }
  }, [storage])

  return <ProjectContext.Provider value={value} {...props} />
}

export const useProject = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error(`useProject must be used within a ProjectProvider`)
  }

  return context
}
