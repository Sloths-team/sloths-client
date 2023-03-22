import { useUI } from '@components/ui/context'
import { CSSProperties, FC, useCallback, useEffect } from 'react'
import s from './DragDropImageView.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { Section } from '../CreateSectionView/CreateSectionView'
import { UseFormReturn } from 'react-hook-form'
import { useSections } from '../context'
import Button from '@components/ui/Button'
import { AiFillMinusCircle } from 'react-icons/ai'

type Props = {
  inner: {
    style: CSSProperties
    methods: UseFormReturn<{ sections: Section[] }, any>
    index: number
    updateFiles: (name: string, files: File[]) => void
  }
}

const ImageZoomView: FC<Props | any> = (props) => {
  const {
    inner: { style, methods, index, updateFiles },
  } = props

  const { closeModal, setModalView, openModal } = useUI()

  const _sections: Section[] = methods?.watch().sections || []

  const { sections, set, sortImages, deleteImage } = useSections()

  const onDeleteCopied = (idx: number) => {
    deleteImage(index, idx)
  }

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return

    sortImages(
      index,
      draggableId,
      source.droppableId,
      destination?.droppableId,
      source.index,
      destination?.index,
      type
    )
  }

  const onSave = useCallback(() => {
    updateFiles('images', sections[index].images)
    closeModal()
  }, [sections])

  useEffect(() => {
    set({ sections: _sections })
  }, [_sections])

  return (
    <div style={style} className={s.root}>
      <div className={s.header}>
        <h2>전체 보기</h2>
        <button onClick={closeModal}>
          <IoCloseOutline />
        </button>
      </div>
      <main className={s.main}>
        <ul className={s.texts}>
          <li>각 이미지 및 영상의 정보 및 순서를 수정할 수 있습니다.</li>
          <li>하단의 저장하기 버튼을 눌러야 수정이 완료됩니다.</li>
        </ul>
        <div className={s.container}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={'sections'} direction={'horizontal'}>
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={s.cards}
                >
                  {sections[index].previews?.map((preview, i) => (
                    <Draggable
                      key={preview + ''}
                      draggableId={preview + ''}
                      index={i}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={s.card}
                        >
                          <div className={s.card__header}>
                            <button onClick={() => onDeleteCopied(i)}>
                              <AiFillMinusCircle />
                            </button>
                          </div>
                          <div className={s.card__content}>
                            <div
                              className={s.card__images}
                              onClick={() => {
                                setModalView('IMAGE_ZOOM_VIEW', { index })
                                openModal()
                              }}
                            >
                              <img key={i} src={preview + ''} />
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div className={s.footer}>
          <Button type="button" onClick={onSave}>
            저장
          </Button>
        </div>
      </main>
    </div>
  )
}

export default ImageZoomView
