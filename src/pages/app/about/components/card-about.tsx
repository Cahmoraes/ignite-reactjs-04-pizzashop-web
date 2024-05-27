import { withTransaction } from '@elastic/apm-rum-react'

function CardAboutComponent() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <h1>About</h1>
    </div>
  )
}

export const CardAbout = withTransaction(
  'CardAbout',
  'component',
)(CardAboutComponent)
