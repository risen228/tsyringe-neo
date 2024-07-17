import { instance as globalContainer } from '../dependency-container'
import { InjectionToken } from '../providers/injection-token'
import { Provider } from '../providers/provider'
import { RegistrationOptions } from '../types/registration-options'

/**
 * Class decorator factory that allows constructor dependencies to be registered at runtime.
 *
 * @return {Function} The class decorator
 */
export function registry(
  registrations: ({
    token: InjectionToken
    options?: RegistrationOptions
  } & Provider<any>)[] = [],
): (target: any) => any {
  return function (target: any): any {
    registrations.forEach(({ token, options, ...provider }) =>
      globalContainer.register(token, provider as any, options),
    )

    return target
  }
}
