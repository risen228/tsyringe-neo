import { injectable } from '../../decorators'
import { B01 } from './01-test-case-B01-injects-A01'

@injectable()
export class A01 {
  constructor(public b: B01) {}
}
