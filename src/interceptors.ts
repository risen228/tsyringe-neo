import { RegistryBase } from './registry-base'
import { InterceptorOptions } from './types'
import {
  PostRegistrationInterceptorCallback,
  PostResolutionInterceptorCallback,
  PreResolutionInterceptorCallback,
} from './types/dependency-container'

export type PostRegistrationInterceptor = {
  callback: PostRegistrationInterceptorCallback
  options: InterceptorOptions
}

export type PreResolutionInterceptor = {
  callback: PreResolutionInterceptorCallback
  options: InterceptorOptions
}

export type PostResolutionInterceptor = {
  callback: PostResolutionInterceptorCallback
  options: InterceptorOptions
}

export class PostRegistrationInterceptors extends RegistryBase<PostRegistrationInterceptor> {}
export class PreResolutionInterceptors extends RegistryBase<PreResolutionInterceptor> {}
export class PostResolutionInterceptors extends RegistryBase<PostResolutionInterceptor> {}

export class Interceptors {
  public postRegistration: PostRegistrationInterceptors = new PostRegistrationInterceptors()
  public postAnyRegistration?: PostRegistrationInterceptorCallback

  public preResolution: PreResolutionInterceptors = new PreResolutionInterceptors()
  public preAnyResolution?: PreResolutionInterceptorCallback

  public postResolution: PostResolutionInterceptors = new PostResolutionInterceptors()
  public postAnyResolution?: PostResolutionInterceptorCallback
}
