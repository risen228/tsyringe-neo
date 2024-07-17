import { instance as globalContainer } from '../dependency-container'
import { ConstructorType } from '../types/constructor'
import { injectable } from './injectable'

/**
 * Class decorator factory that registers the class as a singleton within
 * the global container.
 *
 * @return {Function} The class decorator
 */
export function singleton<T>(): (target: ConstructorType<T>) => void {
  return function (target: ConstructorType<T>): void {
    injectable()(target)
    globalContainer.registerSingleton(target)
  }
}
