import { Operator } from "./types";

export const take =
  <T>(limit: number): Operator<T, T> =>
    async function* (iterable) {
      const iterator =
        (iterable as AsyncIterable<T>)[Symbol.asyncIterator]?.() ??
        (iterable as Iterable<T>)[Symbol.iterator]();

      let taken = 0;

      try {
        while (taken < limit) {
          const { value, done } = await iterator.next();
          if (done) return;
          taken++;
          yield value;
        }
      } finally {
        await iterator.return?.();
      }
    };
