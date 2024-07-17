export type Disposable = {
  dispose(): Promise<void> | void
}

export function isDisposable(value: unknown): value is Disposable {
  if (typeof value !== 'object' || value === null) return false
  if (!('dispose' in value)) return false
  if (typeof value.dispose !== 'function') return false

  const disposeFn = value.dispose

  // `.dispose()` takes in no arguments
  if (disposeFn.length > 0) {
    return false
  }

  return true
}
