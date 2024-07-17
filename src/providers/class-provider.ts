import { DelayedConstructor } from '../lazy-helpers'
import { ConstructorType } from '../types/constructor'
import { Provider } from './provider'

export type ClassProvider<T> = {
  useClass: ConstructorType<T> | DelayedConstructor<T>
}

export function isClassProvider<T>(
  provider: Provider<T>,
): provider is ClassProvider<any> {
  return Boolean((provider as ClassProvider<T>).useClass)
}
