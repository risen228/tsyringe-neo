import { instance as globalContainer } from '../dependency-container'
import { formatErrorCtor } from '../error-helpers'
import {
  isTokenDescriptor,
  isTransformDescriptor,
} from '../providers/injection-token'
import { getParamInfo } from '../reflection-helpers'
import { ConstructorType } from '../types/constructor'

/**
 * Class decorator factory that replaces the decorated class' constructor with
 * a parameterless constructor that has dependencies auto-resolved
 *
 * Note: Resolution is performed using the global container
 *
 * @return {Function} The class decorator
 */
export function autoInjectable(): (target: ConstructorType<any>) => any {
  return function (target: ConstructorType<any>): ConstructorType<any> {
    const paramInfo = getParamInfo(target)

    return class extends target {
      constructor(...args: any[]) {
        super(
          ...args.concat(
            paramInfo.slice(args.length).map((type, index) => {
              try {
                if (isTokenDescriptor(type)) {
                  if (isTransformDescriptor(type)) {
                    return type.multiple
                      ? globalContainer
                          .resolve(type.transform)
                          .transform(
                            globalContainer.resolveAll(type.token),
                            ...type.transformArgs,
                          )
                      : globalContainer
                          .resolve(type.transform)
                          .transform(
                            globalContainer.resolve(type.token),
                            ...type.transformArgs,
                          )
                  }
                  return type.multiple
                    ? globalContainer.resolveAll(type.token)
                    : globalContainer.resolve(type.token)
                }
                if (isTransformDescriptor(type)) {
                  return globalContainer
                    .resolve(type.transform)
                    .transform(
                      globalContainer.resolve(type.token),
                      ...type.transformArgs,
                    )
                }
                return globalContainer.resolve(type)
              } catch (error) {
                const argIndex = index + args.length
                throw new Error(
                  formatErrorCtor(target, argIndex, error as Error),
                )
              }
            }),
          ),
        )
      }
    }
  }
}
