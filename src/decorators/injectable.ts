import { getParamInfo, PARAM_INFOS_METADATA_KEY } from '../reflection-helpers'
import { ConstructorType } from '../types/constructor'

/**
 * Class decorator factory that allows the class' dependencies to be injected
 * at runtime.
 *
 * @return {Function} The class decorator
 */
export function injectable<T>(): (target: ConstructorType<T>) => void {
  return function (target: ConstructorType<T>): void {
    const paramInfo = getParamInfo(target)

    Reflect.defineMetadata(PARAM_INFOS_METADATA_KEY, paramInfo, target)
  }
}
