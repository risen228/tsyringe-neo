import { DependencyContainer } from '../types/dependency-container'
import { FactoryFunction } from './factory-function'

export function instancePerContainerCachingFactory<T>(
  factoryFunc: FactoryFunction<T>,
): FactoryFunction<T> {
  const cache = new WeakMap<DependencyContainer, T>()
  return (dependencyContainer: DependencyContainer) => {
    let instance = cache.get(dependencyContainer)

    if (instance == null) {
      instance = factoryFunc(dependencyContainer)
      cache.set(dependencyContainer, instance)
    }

    return instance
  }
}
