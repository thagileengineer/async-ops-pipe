import { Operator } from "../types";

export const map =
  <I, O>(fn: (value: I) => O): Operator<I, O> =>
    async function* (iterable: AsyncIterable<I>) {
      for await (const item of iterable) {
        yield fn(item);
      }
    };
