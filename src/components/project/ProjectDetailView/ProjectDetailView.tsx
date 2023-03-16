import { FC } from 'react'
import s from './ProjectDetailView.module.css'

const ProjectDetailView: FC = () => {
  return (
    <div className={s.root}>
      <main className={s.main}>
        <div className={s.media_section}></div>
        <div className={s.content_section}>
          <div className={s.section__header}>
            <h1>제목</h1>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProjectDetailView
