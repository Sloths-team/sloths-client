import { useSession } from '@components/common/Layout/context'
import { useUI } from '@components/ui/context'
import { CSSProperties, FC, useMemo } from 'react'
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

type Props = {
  inner: {
    style: CSSProperties
    methods: UseFormReturn<{ sections: Section[] }, any>
  }
}

const DragDropSectionView: FC<Props> = (props) => {
  const {
    inner: { style, methods },
  } = props

  const { closeModal } = useUI()
  const { getValues } = methods
  const sections = useMemo(() => getValues('sections'), [methods])

  console.log(sections)
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result

    console.log('good')
    if (!destination) return

    //  dispatch(
    //    rearrange(
    //      draggableId,
    //      source.droppableId,
    //      destination?.droppableId,
    //      source.index,
    //      destination?.index,
    //      type
    //    )
    //  )
  }

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
            <Droppable
              type="list"
              droppableId={'total'}
              direction={'horizontal'}
            >
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={s.cards}
                >
                  {sections?.map((section, i) => (
                    <Draggable
                      draggableId={`section.${i}`}
                      index={i}
                      key={section.title}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          className={s.card}
                        >
                          <div>{section.title}</div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </main>
    </div>
  )
}

export default DragDropSectionView
