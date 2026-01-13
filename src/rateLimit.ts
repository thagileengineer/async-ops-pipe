import { Operator } from "./types";

const sleep = (ms: number) =>
  new Promise(res => setTimeout(res, ms));

export const rateLimit =
  <T>(ms: number): Operator<T, T> =>
    async function* (iterable) {
      for await (const item of iterable) {
        yield item;
        await sleep(ms);
      }
    };
