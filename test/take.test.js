import { describe, it, expect } from "vitest";
import { pipe } from "../src/pipe.js";
import { take } from "../src/operators/take.js";
import { collect } from "./utils.js";

describe("take()", () => {
  it("takes only N items", async () => {
    const result = await collect(
      pipe([1, 2, 3, 4, 5], take(3))
    );

    expect(result).toEqual([1, 2, 3]);
  });

  it("stops upstream iteration", async () => {
    let count = 0;

    async function* source() {
      for (let i = 1; i <= 5; i++) {
          count++;
          yield i;
      }
    }

    await collect(pipe(source(), take(2)));

    expect(count).toBe(2);
  });
});
