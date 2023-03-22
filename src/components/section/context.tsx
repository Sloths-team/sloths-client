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
} from 'react'

export type State = {
  saved?: boolean
  sections: Section[]
}

export type SectionDragDrop = {
  draggableId: string
  droppableStartId: string
  droppableEndId: string
  droppableStartIndex: number
  droppableEndIndex: number
  type: string
}

export type ImageDragDrop = {
  sectionIndex: number
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
  sortSections: (
    draggableId: string,
    droppableStartId: string,
    droppableEndId: string,
    droppableStartIndex: number,
    droppableEndIndex: number,
    type: string
  ) => void
  sortImages: (
    sectionIndex: number,
    draggableId: string,
    droppableStartId: string,
    droppableEndId: string,
    droppableStartIndex: number,
    droppableEndIndex: number,
    type: string
  ) => void
  deleteSection: (index: number) => void
  deleteImage: (sectionIndex: number, imageIndex: number) => void
}

const initialState: State = {
  saved: false,
  sections: [
    {
      id: 0,
      title: '',
      content: '',
      images: [],
      previews: [],
      codes: [],
    },
  ],
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
      type: 'SORT_SECTIONS'
      data: SectionDragDrop
    }
  | {
      type: 'SORT_IMAGES'
      data: ImageDragDrop
    }
  | {
      type: 'DELETE_SECTION'
      data: { index: number }
    }
  | {
      type: 'DELETE_IMAGE'
      data: { sectionIndex: number; imageIndex: number }
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

    case 'SORT_SECTIONS': {
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

      return { ...state, sections: copied }
    }
    case 'SORT_IMAGES': {
      const {
        sectionIndex,
        droppableStartId,
        droppableEndId,
        droppableStartIndex,
        droppableEndIndex,
        type,
      } = action.data

      const images = Array.from(state.sections[sectionIndex].images)
      const list = images.splice(droppableStartIndex, 1)[0]
      images.splice(droppableEndIndex, 0, list)

      const previews = Array.from(state.sections[sectionIndex].previews)
      const previewList = previews.splice(droppableStartIndex, 1)[0]
      previews.splice(droppableEndIndex, 0, previewList)

      return {
        ...state,
        sections: state.sections.map((section, i) => {
          return i === sectionIndex ? { ...section, images, previews } : section
        }),
      }
    }

    case 'DELETE_SECTION': {
      const { index } = action.data
      return {
        ...state,
        sections: state.sections.filter((_, i) => i !== index),
      }
    }

    case 'DELETE_IMAGE': {
      const { sectionIndex, imageIndex } = action.data
      return {
        ...state,
        sections: state.sections.map((section, i) => {
          if (i === sectionIndex) {
            const images = Array.from(section.images).filter(
              (img, imgI) => imgI !== imageIndex
            )
            const previews = Array.from(section.previews).filter(
              (img, imgI) => imgI !== imageIndex
            )
            return { ...section, images, previews }
          } else {
            return section
          }
        }),
      }
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

  const sortSections = useCallback(
    (
      draggableId: string,
      droppableStartId: string,
      droppableEndId: string,
      droppableStartIndex: number,
      droppableEndIndex: number,
      type: string
    ) => {
      dispatch({
        type: 'SORT_SECTIONS',
        data: {
          draggableId,
          droppableStartId,
          droppableEndId,
          droppableStartIndex,
          droppableEndIndex,
          type,
        },
      })
    },
    [dispatch]
  )

  const addSection = useCallback(() => {}, [dispatch])
  const deleteSection = useCallback(
    (index: number) => {
      dispatch({
        type: 'DELETE_SECTION',
        data: { index },
      })
    },
    [dispatch]
  )
  const deleteImage = useCallback(
    (sectionIndex: number, imageIndex: number) => {
      dispatch({
        type: 'DELETE_IMAGE',
        data: { sectionIndex, imageIndex },
      })
    },
    [dispatch]
  )

  const sortImages = useCallback(
    (
      sectionIndex: number,
      draggableId: string,
      droppableStartId: string,
      droppableEndId: string,
      droppableStartIndex: number,
      droppableEndIndex: number,
      type: string
    ) => {
      dispatch({
        type: 'SORT_IMAGES',
        data: {
          sectionIndex,
          draggableId,
          droppableStartId,
          droppableEndId,
          droppableStartIndex,
          droppableEndIndex,
          type,
        },
      })
    },
    [dispatch]
  )
  const value: ContextValue = useMemo(
    () => ({
      ...state,
      set,
      saveLocal,
      destroyLocal,
      sortSections,
      sortImages,
      deleteSection,
      deleteImage,
    }),
    [state]
  )

  // useEffect(() => {
  //   if (!storage) return
  //   set(JSON.parse(storage))
  // }, [storage])

  return <SectionsContext.Provider value={value} {...props} />
}

export const useSections = () => {
  const context = useContext(SectionsContext)
  if (!context) {
    throw new Error(`useSections must be used within a SectionsProvider`)
  }

  return context
}
