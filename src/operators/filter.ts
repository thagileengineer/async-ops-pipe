import { Operator } from "../types";

export const filter =
  <T>(predicate: (value: T) => boolean): Operator<T, T> =>
    async function* (iterable: AsyncIterable<T>) {
      for await (const item of iterable) {
        if (predicate(item)) {
          yield item;
        }
      }
    };
