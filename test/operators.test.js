import { describe, it, expect } from "vitest";
import { pipe } from "../src/pipe.js";
import { map } from "../src/operators/map.js";

describe("laziness", () => {
  it("does not execute until iterated", async () => {
    let executed = false;

    const iterable = pipe(
      [1, 2, 3],
      map(x => {
        executed = true;
        return x;
      })
    );

    // Not iterated yet
    expect(executed).toBe(false);

    for await (const _ of iterable) {
      break;
    }

    expect(executed).toBe(true);
  });
});
