import { init as initApm } from '@elastic/apm-rum'

export const apm = initApm({
  serviceName: 'pizza-shop',
  serverUrl:
    'https://9db88147461d4c49bf165d6d2801efeb.apm.us-central1.gcp.cloud.es.io:443',
  serviceVersion: '1.1',
  logLevel: 'debug',
  disableInstrumentations: ['click'],
  environment: 'production',
  pageLoadTransactionName: 'pizza-shop',
  flushInterval: 15000, // 15 segundos
})
