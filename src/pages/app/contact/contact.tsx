// import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

import { ContactProvider, useContact } from '@/contexts/contact-context'
import { withApmRouteTracker } from '@/hoc/withApmRouteTracker'

// import { useLocation } from 'react-router-dom'
// import { apm } from '@/lib/elastic-apm'
import { CardContact } from './components/card-contact'

function ContactPage() {
  return (
    <ContactProviderWrapper>
      <ContactComponent />
    </ContactProviderWrapper>
  )
}

interface ContactProviderProps {
  children: React.ReactNode
}

function ContactComponent() {
  // const location = useLocation()
  const { title } = useContact()
  console.log({ title })
  // useEffect(() => {
  //   apm.startTransaction(`[Route] ${location.pathname}`, 'route-change')
  // }, [location.pathname])

  return (
    <>
      <Helmet title="Contact" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

        <CardContact />
      </div>
    </>
  )
}

function ContactProviderWrapper({ children }: ContactProviderProps) {
  return <ContactProvider>{children}</ContactProvider>
}

export const Contact = withApmRouteTracker(ContactPage, '/contact')
