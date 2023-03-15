import { NEW_PROJECT } from '@lib/constants'
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
  title?: string
  description?: string
  repo_url?: string
}

export type ContextValue = State & {
  set: (data: State) => void
  saveCurrent: () => void
  destroyCurrent: () => void
}

const initialState: State = {
  title: '',
  description: '',
  repo_url: '',
}

type Action =
  | {
      type: 'SET'
      data: State
    }
  | {
      type: 'SAVE_CURRENT'
    }
  | {
      type: 'DESTORY_CURRENT'
    }

export const ProjectContext = createContext<ContextValue | null>(null)

ProjectContext.displayName = 'ProjectContext'

function projectReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET': {
      return {
        ...state,
        ...action.data,
      }
    }

    case 'SAVE_CURRENT': {
      return {
        ...state,
      }
    }
    case 'DESTORY_CURRENT': {
      return { ...state }
    }
    default: {
      return { ...state }
    }
  }
}

export const ProjectProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)
  const { storage, saveStorage } = useLocalStorage(NEW_PROJECT)

  const set = useCallback(
    (data: State) => {
      dispatch({ type: 'SET', data })
      saveStorage(JSON.stringify({ repo_url: data.repo_url }))
    },
    [dispatch]
  )

  const saveCurrent = useCallback(() => {
    dispatch({ type: 'SAVE_CURRENT' })
  }, [dispatch])

  const destroyCurrent = useCallback(() => {
    dispatch({ type: 'DESTORY_CURRENT' })
  }, [dispatch])

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      set,
      saveCurrent,
      destroyCurrent,
    }),
    [state]
  )

  useEffect(() => {
    if (!storage) return
    set(JSON.parse(storage))
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
