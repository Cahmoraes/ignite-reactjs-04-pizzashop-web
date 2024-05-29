import { withApmComponentTracker } from '@/hoc/withApmComponentTracker'

function CardAboutComponent() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <h1>About</h1>
    </div>
  )
}

export const CardAbout = withApmComponentTracker(
  CardAboutComponent,
  'CardAbout',
)
