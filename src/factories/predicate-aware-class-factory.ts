import { ConstructorType } from '../types/constructor'
import { DependencyContainer } from '../types/dependency-container'
import { FactoryFunction } from './factory-function'

export function predicateAwareClassFactory<T>(
  predicate: (dependencyContainer: DependencyContainer) => boolean,
  trueConstructor: ConstructorType<T>,
  falseConstructor: ConstructorType<T>,
  useCaching = true,
): FactoryFunction<T> {
  let instance: T
  let previousPredicate: boolean

  return (dependencyContainer: DependencyContainer) => {
    const currentPredicate = predicate(dependencyContainer)

    if (!useCaching || previousPredicate !== currentPredicate) {
      if ((previousPredicate = currentPredicate)) {
        instance = dependencyContainer.resolve(trueConstructor)
      } else {
        instance = dependencyContainer.resolve(falseConstructor)
      }
    }

    return instance
  }
}
