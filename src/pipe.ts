import { AnyIterable, Operator } from "./types";
import { toAsyncIterable } from "./toAsyncIterable";

export function pipe<T>(
  source: AnyIterable<T>
): AsyncIterable<T>;

export function pipe<T, A>(
  source: AnyIterable<T>,
  op1: Operator<T, A>
): AsyncIterable<A>;

export function pipe<T, A, B>(
  source: AnyIterable<T>,
  op1: Operator<T, A>,
  op2: Operator<A, B>
): AsyncIterable<B>;

export function pipe<T, A, B, C>(
  source: AnyIterable<T>,
  op1: Operator<T, A>,
  op2: Operator<A, B>,
  op3: Operator<B, C>
): AsyncIterable<C>;

export function pipe(
  source: AnyIterable<unknown>,
  ...operators: Operator<any, any>[]
): AsyncIterable<any> {
  let iterable: AsyncIterable<any> = toAsyncIterable(source);

  for (const op of operators) {
    iterable = op(iterable);
  }

  return iterable;
}
