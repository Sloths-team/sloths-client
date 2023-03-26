import { useUI } from '@components/ui/context'
import { CSSProperties, FC, useCallback, useEffect } from 'react'
import s from './DragDropSectionView.module.css'
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
    onDelete: (index: number) => void
  }
}

const DragDropSectionView: FC<Props | any> = (props) => {
  const {
    inner: { style, methods },
  } = props

  const { closeModal } = useUI()

  const _sections = methods?.watch().sections || []

  const { sections, set, sortSections, deleteSection } = useSections()

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return

    sortSections(
      draggableId,
      source.droppableId,
      destination?.droppableId,
      source.index,
      destination?.index,
      type
    )
  }

  const onSave = useCallback(() => {
    methods.setValue('sections', sections)
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
          <li>각 색션의 정보 및 순서를 수정할 수 있습니다.</li>
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
                  {sections?.map((section, i) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id + ''}
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
                            <button onClick={() => deleteSection(i)}>
                              <AiFillMinusCircle />
                            </button>
                          </div>
                          <div className={s.card__content}>
                            <div className={s.card__images}>
                              {section.previews?.map((preview, i) => (
                                <img key={i} src={preview + ''} />
                              ))}
                            </div>
                            <div className={s.card__texts}>
                              <h3>{section.title}</h3>
                              <p>{section.content}</p>
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

export default DragDropSectionView
