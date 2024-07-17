import { DependencyContainer } from '../types/dependency-container'
import { Provider } from './provider'

/**
 * Provide a dependency using a factory.
 * Unlike the other providers, this does not support instance caching. If
 * you need instance caching, your factory method must implement it.
 */
export type FactoryProvider<T> = {
  useFactory: (dependencyContainer: DependencyContainer) => T
}

export function isFactoryProvider<T>(
  provider: Provider<T>,
): provider is FactoryProvider<any> {
  return Boolean((provider as FactoryProvider<T>).useFactory)
}
