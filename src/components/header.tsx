import {
  ActivityIcon,
  Contact,
  Home,
  Pizza,
  UtensilsCrossed,
} from 'lucide-react'

import { withLogger } from '@/hooks/with-logger'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'
import { ThemeToggle } from './theme/theme-toggle'
import { Separator } from './ui/separator'

function HeaderComponent() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
          <NavLink to="/orders">
            <UtensilsCrossed className="h-4 w-4" />
            Pedidos
          </NavLink>
          <NavLink to="/about">
            <ActivityIcon className="h-4 w-4" />
            About
          </NavLink>
          <NavLink to="/contact">
            <Contact className="h-4 w-4" />
            Contact
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}

export const Header = withLogger(HeaderComponent)
