import { RegistryBase } from './registry-base'
import { InterceptorOptions } from './types'
import {
  PostResolutionInterceptorCallback,
  PreResolutionInterceptorCallback,
} from './types/dependency-container'

export type PreResolutionInterceptor = {
  callback: PreResolutionInterceptorCallback
  options: InterceptorOptions
}

export type PostResolutionInterceptor = {
  callback: PostResolutionInterceptorCallback
  options: InterceptorOptions
}

export class PreResolutionInterceptors extends RegistryBase<PreResolutionInterceptor> {}

export class PostResolutionInterceptors extends RegistryBase<PostResolutionInterceptor> {}

export class Interceptors {
  public preResolution: PreResolutionInterceptors =
    new PreResolutionInterceptors()

  public postResolution: PostResolutionInterceptors =
    new PostResolutionInterceptors()
}
