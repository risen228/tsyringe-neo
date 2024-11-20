import { instance as globalContainer } from '../dependency-container'

// MARK: After Registration

test('afterRegistration interceptor gets called correctly', () => {
  class Foo {}
  const fn = jest.fn()

  globalContainer.afterRegistration(Foo, fn)
  globalContainer.register(Foo, { useClass: Foo })

  expect(fn).toBeCalled()
})

test('afterRegistration interceptor does not get called when registering other types', () => {
  class Foo {}
  class Bar {}
  const fn = jest.fn()

  globalContainer.afterRegistration(Foo, fn)
  globalContainer.register(Bar, { useClass: Bar })

  expect(fn).not.toHaveBeenCalled()
})

test('afterRegistration one-time interceptor only gets called once', () => {
  class Foo {}
  const fn = jest.fn()

  globalContainer.afterRegistration(Foo, fn, {
    frequency: 'Once',
  })
  globalContainer.register(Foo, { useClass: Foo })
  globalContainer.register(Foo, { useClass: Foo })

  expect(fn).toBeCalledTimes(1)
})

test('afterRegistration always run interceptor gets called on each registration', () => {
  class Foo {}
  const fn = jest.fn()

  globalContainer.afterRegistration(Foo, fn)
  globalContainer.register(Foo, { useClass: Foo })
  globalContainer.register(Foo, { useClass: Foo })

  expect(fn).toBeCalledTimes(2)
})

test('afterRegistration multiple interceptors get called correctly', () => {
  class Foo {}
  const fn1 = jest.fn()
  const fn2 = jest.fn()

  globalContainer.afterRegistration(Foo, fn1, {
    frequency: 'Once',
  })
  globalContainer.afterRegistration(Foo, fn2, {
    frequency: 'Once',
  })
  globalContainer.register(Foo, { useClass: Foo })

  expect(fn1).toBeCalled()
  expect(fn2).toBeCalled()
})

test('afterRegistration multiple interceptors get per their options', () => {
  class Foo {}
  const fn1 = jest.fn()
  const fn2 = jest.fn()

  globalContainer.afterRegistration(Foo, fn1, {
    frequency: 'Once',
  })
  globalContainer.afterRegistration(Foo, fn2, {
    frequency: 'Always',
  })
  globalContainer.register(Foo, { useClass: Foo })
  globalContainer.register(Foo, { useClass: Foo })

  expect(fn1).toBeCalledTimes(1)
  expect(fn2).toBeCalledTimes(2)
})

test('afterAnyRegistration interceptor gets called on each registration', () => {
  class Foo {}
  class Bar {}
  const fn = jest.fn()

  globalContainer.afterAnyRegistration(fn)
  globalContainer.register(Foo, { useClass: Foo })
  globalContainer.register(Bar, { useClass: Bar })

  expect(fn).toBeCalledTimes(2)
})

// MARK: Before Resolution

test('beforeResolution interceptor gets called correctly', () => {
  class Bar {}
  const interceptorFn = jest.fn()

  globalContainer.beforeResolution(Bar, interceptorFn)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalled()
})

test('beforeResolution interceptor using default options gets called correctly', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalled()
})

test('beforeResolution interceptor does not get called when resolving other types', () => {
  class Bar {}
  class Foo {}
  const interceptorFn = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn)
  globalContainer.resolve(Foo)

  expect(interceptorFn).not.toHaveBeenCalled()
})

test('beforeResolution one-time interceptor only gets called once', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn, {
    frequency: 'Once',
  })
  globalContainer.resolve(Bar)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalledTimes(1)
})

test('beforeResolution always run interceptor gets called on each resolution', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn, {
    frequency: 'Always',
  })
  globalContainer.resolve(Bar)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalledTimes(2)
})

test('beforeResolution multiple interceptors get called correctly', () => {
  class Bar {}
  const interceptorFn1 = jest.fn()
  const interceptorFn2 = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn1, {
    frequency: 'Once',
  })
  globalContainer.beforeResolution(Bar, interceptorFn2, {
    frequency: 'Once',
  })
  globalContainer.resolve(Bar)

  expect(interceptorFn1).toBeCalled()
  expect(interceptorFn2).toBeCalled()
})

test('beforeResolution multiple interceptors get per their options', () => {
  class Bar {}
  const interceptorFn1 = jest.fn()
  const interceptorFn2 = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn1, {
    frequency: 'Once',
  })
  globalContainer.beforeResolution(Bar, interceptorFn2, {
    frequency: 'Always',
  })
  globalContainer.resolve(Bar)
  globalContainer.resolve(Bar)

  expect(interceptorFn1).toBeCalledTimes(1)
  expect(interceptorFn2).toBeCalledTimes(2)
})

test('beforeResolution interceptor gets called correctly on resolveAll()', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.beforeResolution(Bar, interceptorFn)
  globalContainer.resolveAll(Bar)

  expect(interceptorFn).toBeCalledWith(expect.any(Function), 'All')
})

test('beforeAnyResolution interceptor gets called on each resolution', () => {
  class Foo {}
  class Bar {}
  const fn = jest.fn()

  globalContainer.beforeAnyResolution(fn)
  globalContainer.resolve(Foo)
  globalContainer.resolve(Bar)

  expect(fn).toBeCalledTimes(2)
})

// MARK: After Resolution

test('afterResolution interceptor gets called correctly', () => {
  class Bar {}
  const interceptorFn = jest.fn()

  globalContainer.afterResolution(Bar, interceptorFn, {
    frequency: 'Always',
  })
  globalContainer.resolve(Bar)

  expect(interceptorFn).toHaveBeenCalled()
})

test('afterResolution interceptor passes object of correct type', () => {
  class Bar {}
  const interceptorFn = jest.fn()

  globalContainer.afterResolution(Bar, interceptorFn, {
    frequency: 'Always',
  })
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalledWith(
    expect.any(Function),
    expect.any(Object),
    'Single',
  )
})

test('afterResolution interceptor gets called correctly with default options', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalled()
})

test('afterResolution interceptor does not get called when resolving other types', () => {
  class Bar {}
  class Foo {}
  const interceptorFn = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn)
  globalContainer.resolve(Foo)

  expect(interceptorFn).not.toHaveBeenCalled()
})

test('afterResolution one-time interceptor only gets called once', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn, {
    frequency: 'Once',
  })
  globalContainer.resolve(Bar)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalledTimes(1)
})

test('afterResolution always run interceptor gets called on each resolution', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn, {
    frequency: 'Always',
  })
  globalContainer.resolve(Bar)
  globalContainer.resolve(Bar)

  expect(interceptorFn).toBeCalledTimes(2)
})

test('afterResolution multiple interceptors get called correctly', () => {
  class Bar {}
  const interceptorFn1 = jest.fn()
  const interceptorFn2 = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn1, {
    frequency: 'Once',
  })
  globalContainer.afterResolution(Bar, interceptorFn2, {
    frequency: 'Once',
  })
  globalContainer.resolve(Bar)

  expect(interceptorFn1).toBeCalled()
  expect(interceptorFn2).toBeCalled()
})

test('afterResolution multiple interceptors get per their options', () => {
  class Bar {}
  const interceptorFn1 = jest.fn()
  const interceptorFn2 = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn1, {
    frequency: 'Once',
  })
  globalContainer.afterResolution(Bar, interceptorFn2, {
    frequency: 'Always',
  })
  globalContainer.resolve(Bar)
  globalContainer.resolve(Bar)

  expect(interceptorFn1).toBeCalledTimes(1)
  expect(interceptorFn2).toBeCalledTimes(2)
})

test('afterResolution interceptor gets called correctly on resolveAll()', () => {
  class Bar {}
  const interceptorFn = jest.fn()
  globalContainer.afterResolution(Bar, interceptorFn)
  globalContainer.resolveAll(Bar)

  expect(interceptorFn).toBeCalledWith(
    expect.any(Function),
    expect.any(Object),
    'All',
  )
})

test('afterAnyResolution interceptor gets called on each resolution', () => {
  class Foo {}
  class Bar {}
  const fn = jest.fn()

  globalContainer.afterAnyResolution(fn)
  globalContainer.resolve(Foo)
  globalContainer.resolve(Bar)

  expect(fn).toBeCalledTimes(2)
})
