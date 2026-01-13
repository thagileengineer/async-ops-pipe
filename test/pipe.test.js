import { describe, it, expect } from "vitest";
import { pipe } from "../src/pipe.js";
import { map } from "../src/operators/map.js";
import { filter } from "../src/operators/filter.js";
import { collect } from "./utils.js";

describe("pipe()", () => {
  it("composes operators left to right", async () => {
    const result = await collect(
      pipe(
        [1, 2, 3, 4],
        map(x => x * 2),
        filter(x => x > 4)
      )
    );

    expect(result).toEqual([6, 8]);
  });

  it("preserves order", async () => {
    const result = await collect(
      pipe([3, 1, 2], map(x => x))
    );

    expect(result).toEqual([3, 1, 2]);
  });
});
