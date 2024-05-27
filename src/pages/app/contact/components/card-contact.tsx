// import { useEffect } from 'react'

import { withTransaction } from '@elastic/apm-rum-react'

// import { apm } from '@/lib/elastic-apm'

function CardContactComponent() {
  // useEffect(() => {
  //   apm.startTransaction('CardContact', 'component')
  // }, [])
  return (
    <div className="grid grid-cols-12 gap-4">
      <h1>Contact</h1>
    </div>
  )
}

export const CardContact = withTransaction(
  'CardContact',
  'component',
)(CardContactComponent)
