import { useEffect } from 'react'

import { apm } from '@/lib/elastic-apm'

interface WithApmComponentTrackerProps {
  transactionName?: string
}

export const withApmComponentTracker = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
): React.FC<P & WithApmComponentTrackerProps> => {
  return function TrackedComponent(props: P & WithApmComponentTrackerProps) {
    useEffect(() => {
      console.log({ componentName })
      const transaction = apm.startTransaction(componentName, 'component', {
        managed: true,
      })
      // Criar um span para medir o tempo de montagem do componente
      const mountSpan = transaction?.startSpan('component-mount', 'custom')

      const captureMetrics = () => {
        transaction?.end()
      }

      if (transaction) {
        isDocumentReady() ? captureMetrics() : createEventLoadOnWindow()
      }

      function isDocumentReady() {
        return document.readyState === 'complete'
      }

      function createEventLoadOnWindow() {
        window.addEventListener('load', captureMetrics)
      }

      return () => {
        window.removeEventListener('load', captureMetrics)
        mountSpan?.end()
      }
    }, [])

    return <Component {...props} />
  }
}
