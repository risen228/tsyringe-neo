import { DelayedConstructor } from '../lazy-helpers'
import { ConstructorType } from '../types/constructor'
import { Transform } from '../types/transform'

export type InjectionToken<T = any> =
  | ConstructorType<T>
  | string
  | symbol
  | DelayedConstructor<T>

export function isNormalToken(
  token?: InjectionToken<any>,
): token is string | symbol {
  return typeof token === 'string' || typeof token === 'symbol'
}

export function isTokenDescriptor(
  descriptor: any,
): descriptor is TokenDescriptor {
  return (
    typeof descriptor === 'object' &&
    'token' in descriptor &&
    'multiple' in descriptor
  )
}

export function isTransformDescriptor(
  descriptor: any,
): descriptor is TransformDescriptor {
  return (
    typeof descriptor === 'object' &&
    'token' in descriptor &&
    'transform' in descriptor
  )
}

export function isConstructorToken(
  token?: InjectionToken<any>,
): token is ConstructorType<any> | DelayedConstructor<any> {
  return typeof token === 'function' || token instanceof DelayedConstructor
}

export type TokenDescriptor = {
  token: InjectionToken<any>
  multiple: boolean
}

export type TransformDescriptor = {
  token: InjectionToken<any>
  transform: InjectionToken<Transform<any, any>>
  transformArgs: any[]
}
