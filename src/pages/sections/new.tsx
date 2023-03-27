import { Layout } from '@components/common'
import { CreateSectionView } from '@components/section'
import { SectionsProvider } from '@components/section/context'

const CreateSection = () => {
  return <CreateSectionView />
}

CreateSection.Layout = Layout

export default CreateSection
