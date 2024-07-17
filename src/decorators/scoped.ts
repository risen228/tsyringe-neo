import { instance as globalContainer } from '../dependency-container'
import { InjectionToken } from '../providers'
import { ConstructorType } from '../types/constructor'
import { Lifecycle } from '../types/lifecycle'
import { injectable } from './injectable'

/**
 * Class decorator factory that registers the class as a scoped dependency within
 * the global container.
 *
 * @return The class decorator
 */
export function scoped<T>(
  lifecycle: Lifecycle.ContainerScoped | Lifecycle.ResolutionScoped,
  token?: InjectionToken<T>,
): (target: ConstructorType<T>) => void {
  return function (target: ConstructorType<T>): void {
    injectable()(target)
    globalContainer.register(token || target, target, {
      lifecycle,
    })
  }
}
