import { Operator } from "../types";

export const tap =
  <T>(fn: (value: T) => void | Promise<void>): Operator<T, T> =>
    async function* (iterable) {
      for await (const item of iterable) {
        await fn(item);
        yield item;
      }
    };
