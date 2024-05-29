import { Helmet } from 'react-helmet-async'

import { withApmRouteTracker } from '@/hoc/withApmRouteTracker'

import { CardAbout } from './components/card-about'

function AboutPage() {
  return (
    <>
      <Helmet title="About" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <CardAbout />
      </div>
    </>
  )
}

export const About = withApmRouteTracker(AboutPage, '/about')
