import { InjectionToken } from './injection-token'
import { Provider } from './provider'

export type TokenProvider<T> = {
  useToken: InjectionToken<T>
}

export function isTokenProvider<T>(
  provider: Provider<T>,
): provider is TokenProvider<any> {
  return Boolean((provider as TokenProvider<T>).useToken)
}
