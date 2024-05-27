import { createContext, type ReactNode, useContext } from 'react'

export interface CreateContextData {
  title: string
}

const ContactContext = createContext({} as CreateContextData)

interface ContactProviderProps {
  children: ReactNode
}

export function ContactProvider({ children }: ContactProviderProps) {
  return (
    <ContactContext.Provider value={{ title: 'Contato' }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  return useContext(ContactContext)
}
