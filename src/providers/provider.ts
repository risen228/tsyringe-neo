import { ClassProvider, isClassProvider } from './class-provider'
import { FactoryProvider, isFactoryProvider } from './factory-provider'
import { isTokenProvider, TokenProvider } from './token-provider'
import { isValueProvider, ValueProvider } from './value-provider'

export type Provider<T = any> =
  | ClassProvider<T>
  | ValueProvider<T>
  | TokenProvider<T>
  | FactoryProvider<T>

export function isProvider(provider: any): provider is Provider {
  return (
    isClassProvider(provider) ||
    isValueProvider(provider) ||
    isTokenProvider(provider) ||
    isFactoryProvider(provider)
  )
}
