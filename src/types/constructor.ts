/** Constructor type */
export type ConstructorType<T> = {
  new (...args: any[]): T
}
