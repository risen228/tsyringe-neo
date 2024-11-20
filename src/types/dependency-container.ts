import { ClassProvider } from '../providers/class-provider'
import { FactoryProvider } from '../providers/factory-provider'
import { InjectionToken } from '../providers/injection-token'
import { TokenProvider } from '../providers/token-provider'
import { ValueProvider } from '../providers/value-provider'
import { ConstructorType } from './constructor'
import { Disposable } from './disposable'
import { InterceptorOptions } from './interceptor-options'
import { RegistrationOptions } from './registration-options'

export type ResolutionType = 'Single' | 'All'

export type PostRegistrationInterceptorCallback<T = any> = {
  /**
   * @param token The InjectionToken that was intercepted
   */
  (token: InjectionToken<T>): void
}

export type PreResolutionInterceptorCallback<T = any> = {
  /**
   * @param token The InjectionToken that was intercepted
   * @param resolutionType The type of resolve that was called (i.e. All or Single)
   */
  (token: InjectionToken<T>, resolutionType: ResolutionType): void
}

export type PostResolutionInterceptorCallback<T = any> = {
  /**
   * @param token The InjectionToken that was intercepted
   * @param result The object that was resolved from the container
   * @param resolutionType The type of resolve that was called (i.e. All or Single)
   */
  (
    token: InjectionToken<T>,
    result: T | T[],
    resolutionType: ResolutionType,
  ): void
}

export type DependencyContainer = {
  register<T>(
    token: InjectionToken<T>,
    provider: ValueProvider<T>,
  ): DependencyContainer
  register<T>(
    token: InjectionToken<T>,
    provider: FactoryProvider<T>,
  ): DependencyContainer
  register<T>(
    token: InjectionToken<T>,
    provider: TokenProvider<T>,
    options?: RegistrationOptions,
  ): DependencyContainer
  register<T>(
    token: InjectionToken<T>,
    provider: ClassProvider<T>,
    options?: RegistrationOptions,
  ): DependencyContainer
  register<T>(
    token: InjectionToken<T>,
    provider: ConstructorType<T>,
    options?: RegistrationOptions,
  ): DependencyContainer

  registerSingleton<T>(
    from: InjectionToken<T>,
    to: InjectionToken<T>,
  ): DependencyContainer
  registerSingleton<T>(token: ConstructorType<T>): DependencyContainer

  registerType<T>(
    from: InjectionToken<T>,
    to: InjectionToken<T>,
  ): DependencyContainer

  registerInstance<T>(
    token: InjectionToken<T>,
    instance: T,
  ): DependencyContainer

  /**
   * Resolve a token into an instance
   *
   * @param token The dependency token
   * @return An instance of the dependency
   */
  resolve<T>(token: InjectionToken<T>): T
  resolveAll<T>(token: InjectionToken<T>): T[]

  /**
   * Gets all registered tokens
   */
  registeredTokens(): InjectionToken<any>[]

  /**
   * Check if the given dependency is registered
   *
   * @param token The token to check
   * @param recursive Should parent containers be checked?
   * @return Whether or not the token is registered
   */
  isRegistered<T>(token: InjectionToken<T>, recursive?: boolean): boolean

  /**
   * Clears all registered tokens
   */
  reset(): void
  unregisterAll(): void
  unregister<T>(token: InjectionToken<T>): void

  clearInstances(): void
  createChildContainer(): DependencyContainer

  /**
   * Registers a callback that is called when a specific injection token is registered
   * @param token The token to intercept
   * @param callback The callback that is called after the token is registered
   * @param options Options for under what circumstances the callback will be called
   */
  afterRegistration<T>(
    token: InjectionToken<T>,
    callback: PostRegistrationInterceptorCallback<T>,
    options?: InterceptorOptions,
  ): void

  /**
   * Registers a callback that is called after any registration
   * @param callback The callback that is called after any registration
   */
  afterAnyRegistration(callback: PostRegistrationInterceptorCallback<any>): void

  /**
   * Registers a callback that is called when a specific injection token is resolved
   * @param token The token to intercept
   * @param callback The callback that is called before the token is resolved
   * @param options Options for under what circumstances the callback will be called
   */
  beforeResolution<T>(
    token: InjectionToken<T>,
    callback: PreResolutionInterceptorCallback<T>,
    options?: InterceptorOptions,
  ): void

  /**
   * Registers a callback that is called before any resolution
   * @param callback The callback that is called before any resolution
   */
  beforeAnyResolution(callback: PreResolutionInterceptorCallback<any>): void

  /**
   * Registers a callback that is called after a successful resolution of the token
   * @param token The token to intercept
   * @param callback The callback that is called after the token is resolved
   * @param options Options for under what circumstances the callback will be called
   */
  afterResolution<T>(
    token: InjectionToken<T>,
    callback: PostResolutionInterceptorCallback<T>,
    options?: InterceptorOptions,
  ): void

  /**
   * Registers a callback that is called after any successful resolution
   * @param callback The callback that is called after any resolution
   * @param options
   */
  afterAnyResolution(callback: PostResolutionInterceptorCallback<any>): void

  /**
   * Calls `.dispose()` on all disposable instances created by the container.
   * After calling this, the container may no longer be used.
   */
  dispose(): Promise<void> | void
} & Disposable
