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
  initial?: boolean
  saved: boolean
  project: {
    title?: string
    description?: string
    repo_url?: string
    media_url?: string
    root?: number | null
  }
}

export type ContextValue = State & {
  set: (data: State) => void
  update: (data: State) => void
  destroyCurrent: () => void
}

const initialState: State = {
  initial: true,
  saved: false,
  project: {
    title: '',
    description: '',
    repo_url: '',
    media_url: '',
    root: null,
  },
}

type Action =
  | {
      type: 'SET'
      data: State
    }
  | {
      type: 'UPDATE'
      data: State
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

    case 'UPDATE': {
      return {
        ...state,
        ...action.data,
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
    },
    [dispatch]
  )

  const update = useCallback(
    (data: State) => {
      dispatch({ type: 'UPDATE', data })
      saveStorage(JSON.stringify({ ...state, ...data }))
    },
    [dispatch, state]
  )

  const destroyCurrent = useCallback(() => {
    dispatch({ type: 'DESTORY_CURRENT' })
  }, [dispatch])

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      set,
      update,
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
