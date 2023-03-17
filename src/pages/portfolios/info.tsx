import { Layout } from '@components/common'
import PortfolioInfoView from '@components/portfolio/PortfolioInfoView'
import { withLoggedIn } from '@lib/withLoggedIn'

const PortfolioInfo = () => {
  return <PortfolioInfoView />
}

PortfolioInfo.Layout = Layout

export default withLoggedIn(PortfolioInfo)
