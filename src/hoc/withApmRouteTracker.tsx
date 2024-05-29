import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { apm } from '@/lib/elastic-apm'

interface WithApmRouteTrackerProps {
  transactionName?: string
}

export const withApmRouteTracker = <P extends object>(
  Component: React.ComponentType<P>,
  transactionName?: string,
): React.FC<P & WithApmRouteTrackerProps> => {
  return function TrackedComponent(props: P & WithApmRouteTrackerProps) {
    const location = useLocation()
    useEffect(() => {
      const transaction = apm.startTransaction(
        transactionName ?? location.pathname,
        'route-change',
        { managed: true },
      )

      // Criar um span para medir o tempo de montagem do componente
      const mountSpan = transaction?.startSpan('route-mount', 'custom')

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
    }, [location])

    return <Component {...props} />
  }
}
