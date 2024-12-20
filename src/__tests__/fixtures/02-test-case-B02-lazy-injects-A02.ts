import { inject, singleton } from '../../decorators'
import { delay } from '../../lazy-helpers'
import { A02 } from './02-test-case-A02-lazy-injects-B02'

@singleton()
export class B02 {
  public name = 'B02'
  public prop = {
    defined: false,
  }

  constructor(@inject(delay(() => A02)) public a: A02) {}
}
