import { AnyIterable } from "./types";

export async function* toAsyncIterable<T>(
  iterable: AnyIterable<T>
): AsyncIterable<T> {
  for await (const item of iterable) {
    yield item;
  }
}
