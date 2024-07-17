import { Registration } from './dependency-container'

export class ResolutionContext {
  scopedResolutions: Map<Registration, any> = new Map()
}
