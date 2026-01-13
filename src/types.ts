export type AnyIterable<T> =
  | Iterable<T>
  | AsyncIterable<T>;

export type Operator<I, O> =
  (iterable: AsyncIterable<I>) => AsyncIterable<O>;
