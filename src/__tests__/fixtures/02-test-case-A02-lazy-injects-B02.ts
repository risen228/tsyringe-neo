import { inject, injectable } from '../../decorators'
import { delay } from '../../lazy-helpers'
import { B02 } from './02-test-case-B02-lazy-injects-A02'

@injectable()
export class A02 {
  constructor(@inject(delay(() => B02)) public b: B02) {}
}
