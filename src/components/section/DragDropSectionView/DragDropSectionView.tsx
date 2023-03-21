import { useUI } from '@components/ui/context'
import {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import s from './DragDropSectionView.module.css'
import { IoCloseOutline } from 'react-icons/io5'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { Section } from '../CreateSectionView/CreateSectionView'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { useSections } from '../context'
import Button from '@components/ui/Button'

type Props = {
  inner: {
    style: CSSProperties
    methods: UseFormReturn<{ sections: Section[] }, any>
    onDelete: (index: number) => void
  }
}

const DragDropSectionView: FC<Props> = (props) => {
  const {
    inner: { style, methods },
  } = props

  const { closeModal } = useUI()

  const _sections = methods.watch().sections

  const { sections, sort, set } = useSections()
  const [copied, setCopied] = useState<Section[]>([])

  const onDeleteCopied = (idx: number) =>
    setCopied((p) => p.filter((v, i) => i !== idx))

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return

    sort(
      draggableId,
      source.droppableId,
      destination?.droppableId,
      source.index,
      destination?.index,
      type
    )
  }

  const onSave = useCallback(() => {
    methods.setValue('sections', copied)
    closeModal()
  }, [copied])

  useEffect(() => {
    set({ sections: _sections })
  }, [_sections])

  useEffect(() => {
    setCopied(sections)
  }, [sections])

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
                  {copied?.map((section, i) => (
                    <Draggable
                      key={section.id + ''}
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
                          <button onClick={() => onDeleteCopied(i)}>
                            삭제
                          </button>
                          <div>{section.title}</div>
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
