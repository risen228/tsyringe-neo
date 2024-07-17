import { DependencyContainer } from '../types/dependency-container'

export type FactoryFunction<T> = (dependencyContainer: DependencyContainer) => T
