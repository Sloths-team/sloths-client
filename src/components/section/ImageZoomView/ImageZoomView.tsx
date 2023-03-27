import { useUI } from '@components/ui/context'
import { CSSProperties, FC } from 'react'
import s from './ImageZoomView.module.css'
import { Section } from '../CreateSectionView/CreateSectionView'
import { UseFormReturn } from 'react-hook-form'
import { useSections } from '../context'
import { IoCloseOutline } from 'react-icons/io5'

type Props = {
  style: CSSProperties
  methods: UseFormReturn<{ sections: Section[] }, any>
  index: number
  onDeleteFile: (name: string, index: number) => void
}

const ImageZoomView: FC<Props | any> = (props) => {
  const { style, index } = props

  const { closeModal } = useUI()

  const { sections } = useSections()

  return (
    <div style={style} className={s.root}>
      <button onClick={closeModal}>
        <IoCloseOutline />
      </button>
      <ul className={s.container}>
        {sections[index].previews?.map((preview, i) => (
          <li className={s.card} key={preview + ''}>
            <img key={i} src={preview + ''} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ImageZoomView
