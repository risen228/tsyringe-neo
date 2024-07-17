import { Lifecycle } from './lifecycle'

export type RegistrationOptions = {
  /**
   * Customize the lifecycle of the registration
   * See https://github.com/risen228/tsyringe-neo#available-scopes for more information
   */
  lifecycle: Lifecycle
}
