import type { ComponentType } from 'react'

export function withLogger<Props extends object>(
  Component: ComponentType<Props>,
): ComponentType<Props> {
  console.log(Component.name)
  return function WithLogger(props: Props) {
    return <Component {...props} />
  }
}
