import { Section } from '@components/section/CreateSectionView/CreateSectionView'
import { NEW_SECTIONS } from '@lib/constants'
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
  saved?: boolean
  sections: Section[]
}

export type DragDrop = {
  draggableId: string
  droppableStartId: string
  droppableEndId: string
  droppableStartIndex: number
  droppableEndIndex: number
  type: string
}

export type ContextValue = State & {
  set: (data: State) => void
  saveLocal: (data: State) => void
  destroyLocal: () => void
  sort: (
    draggableId: string,
    droppableStartId: string,
    droppableEndId: string,
    droppableStartIndex: number,
    droppableEndIndex: number,
    type: string
  ) => void
}

const initialState: State = {
  saved: false,
  sections: [],
}

type Action =
  | {
      type: 'SET'
      data: State
    }
  | {
      type: 'SAVE_LOCAL'
      data: State
    }
  | {
      type: 'DESTROY_LOCAL'
    }
  | {
      type: 'SORT'
      data: DragDrop
    }

export const SectionsContext = createContext<ContextValue | null>(null)

SectionsContext.displayName = 'SectionsContext'

function projectReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET': {
      return {
        ...state,
        ...action.data,
      }
    }
    case 'SAVE_LOCAL': {
      return {
        ...state,
        ...action.data,
      }
    }
    case 'DESTROY_LOCAL': {
      return { ...state }
    }

    case 'SORT': {
      const {
        droppableStartId,
        droppableEndId,
        droppableStartIndex,
        droppableEndIndex,
        type,
      } = action.data

      const copied = [...state.sections]

      const list = copied.splice(droppableStartIndex, 1)[0]
      copied.splice(droppableEndIndex, 0, list)

      const startList = copied.filter(
        (section) => section.id + '' === droppableStartId
      )[0]

      const endList = copied.filter(
        (section) => section.id + '' === droppableEndId
      )[0]

      // updateLists(copied)

      return { ...state, sections: copied }
    }
    default: {
      return { ...state }
    }
  }
}

export const SectionsProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)
  const { storage, saveStorage } = useLocalStorage(NEW_SECTIONS)

  const set = useCallback(
    (data: State) => {
      dispatch({ type: 'SET', data })
    },
    [dispatch]
  )

  const saveLocal = useCallback(
    (data: State) => {
      dispatch({ type: 'SAVE_LOCAL', data })
      saveStorage(JSON.stringify({ ...state, ...data }))
    },
    [dispatch, state]
  )

  const destroyLocal = useCallback(() => {
    dispatch({ type: 'DESTROY_LOCAL' })
  }, [dispatch])

  const sort = useCallback(
    (
      draggableId: string,
      droppableStartId: string,
      droppableEndId: string,
      droppableStartIndex: number,
      droppableEndIndex: number,
      type: string
    ) => ({
      type: 'SORT',
      data: {
        draggableId,
        droppableStartId,
        droppableEndId,
        droppableStartIndex,
        droppableEndIndex,
        type,
      },
    }),
    [dispatch]
  )

  const value: ContextValue = useMemo(
    () => ({
      ...state,
      set,
      saveLocal,
      destroyLocal,
      sort,
    }),
    [state]
  )

  useEffect(() => {
    if (!storage) return
    set(JSON.parse(storage))
  }, [storage])

  return <SectionsContext.Provider value={value} {...props} />
}

export const useSections = () => {
  const context = useContext(SectionsContext)
  if (!context) {
    throw new Error(`useSections must be used within a SectionsProvider`)
  }

  return context
}
