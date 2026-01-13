import { Operator } from "../types";


export const take =
  <T>(limit: number): Operator<T, T> =>
    async function* (iterable: AsyncIterable<T>) {
      let taken = 0;

      for await (const item of iterable) {
        if (taken++ >= limit) return;
        yield item;
      }
    };
