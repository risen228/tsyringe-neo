import { Provider } from './provider'

export type ValueProvider<T> = {
  useValue: T
}

export function isValueProvider<T>(
  provider: Provider<T>,
): provider is ValueProvider<T> {
  return (provider as ValueProvider<T>).useValue != null
}
