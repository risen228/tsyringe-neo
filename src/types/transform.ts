export type Transform<TIn, TOut> = {
  transform: (incoming: TIn, ...args: any[]) => TOut
}
