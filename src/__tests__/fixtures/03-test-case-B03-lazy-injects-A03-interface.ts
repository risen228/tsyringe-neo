import { inject, injectable, registry } from '../../decorators'
import { delay } from '../../lazy-helpers'
import type { Ia03 } from './03-test-case-A03-lazy-injects-B03-interface'
import { A03 } from './03-test-case-A03-lazy-injects-B03-interface'

export type Ib03 = {
  name: string
}

@injectable()
@registry([
  {
    token: 'Ia03',
    useToken: delay(() => A03),
  },
])
export class B03 implements Ib03 {
  public name = 'B03'
  constructor(@inject('Ia03') public a: Ia03) {}
}
