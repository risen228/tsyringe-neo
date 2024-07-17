// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (typeof Reflect === 'undefined' || !Reflect.getMetadata) {
  throw new Error(
    `tsyringe-neo requires a reflect polyfill. Please add 'import "reflect-metadata"' to the top of your entry point.`,
  )
}

export * from './decorators'
export { instance as container } from './dependency-container'
export * from './factories'
export { delay } from './lazy-helpers'
export * from './providers'
export type {
  DependencyContainer,
  Disposable,
  Frequency,
  RegistrationOptions,
} from './types'
export { Lifecycle } from './types/lifecycle'
