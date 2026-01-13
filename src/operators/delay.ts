import { Operator } from "../types";

const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const delay =
  <T>(ms: number): Operator<T, T> =>
    async function* (iterable: AsyncIterable<T>) {
      for await (const item of iterable) {
        await sleep(ms);
        yield item;
      }
    };
