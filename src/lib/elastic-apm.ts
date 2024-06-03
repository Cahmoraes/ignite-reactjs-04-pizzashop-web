import { init as initApm } from '@elastic/apm-rum'

export const apm = initApm({
  serviceName: 'pizza-shop',
  serverUrl:
    'https://b20d57da0d174ee988b2d06fcc609ea6.apm.us-central1.gcp.cloud.es.io:443',
  serviceVersion: '1',
  logLevel: 'debug',
  disableInstrumentations: ['click'],
  environment: 'production',
  pageLoadTransactionName: 'pizza-shop',
  flushInterval: 500,
})
