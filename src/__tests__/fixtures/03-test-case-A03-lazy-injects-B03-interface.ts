import { inject, injectable, registry } from '../../decorators'
import { delay } from '../../lazy-helpers'
import type { Ib03 } from './03-test-case-B03-lazy-injects-A03-interface'
import { B03 } from './03-test-case-B03-lazy-injects-A03-interface'

export type Ia03 = {
  name: string
}

@injectable()
@registry([
  {
    token: 'Ib03',
    useToken: delay(() => B03),
  },
])
export class A03 implements Ia03 {
  public name = 'A03'
  constructor(@inject('Ib03') public b: Ib03) {}
}
