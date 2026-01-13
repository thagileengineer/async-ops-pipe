

javascript ```
import {
  pipe,
  map,
  filter,
  tap,
  rateLimit,
  take
} from "async-pipe";

const pipeline = pipe(
  [1, 2, 3, 4, 5, 6],
  map(x => x * 10),
  filter(x => x > 20),
  tap(x => console.log("Passing:", x)),
  rateLimit(500),
  take(3)
);

for await (const value of pipeline) {
  console.log("Consumed:", value);
}
```