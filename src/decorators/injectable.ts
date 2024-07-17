import { typeInfo } from '../dependency-container'
import { getParamInfo } from '../reflection-helpers'
import { ConstructorType } from '../types/constructor'

/**
 * Class decorator factory that allows the class' dependencies to be injected
 * at runtime.
 *
 * @return {Function} The class decorator
 */
export function injectable<T>(): (target: ConstructorType<T>) => void {
  return function (target: ConstructorType<T>): void {
    typeInfo.set(target, getParamInfo(target))
  }
}
