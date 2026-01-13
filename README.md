# async-pipe

> A lightweight, pull-based async pipeline library for JavaScript
> **Lazy. Composable. Backpressure-aware.**

---

## Why async-pipe?

Modern JavaScript has powerful primitives:

* **Async iterators**
* **Async generators**
* **`for await...of`**

But composing them cleanly for **real backend workflows** is still painful.

`async-pipe` solves this by providing:

* A **minimal pipeline abstraction**
* Built on **native async iterators**
* Without the complexity of RxJS

---

## Core Idea

> **Describe how data flows — execution happens only when you iterate.**

```js
const pipeline = pipe(
  source,
  map(transform),
  filter(predicate),
  rateLimit(500),
  take(10)
);

// Nothing runs yet

for await (const item of pipeline) {
  console.log(item);
}
```

---

## Features

* ✅ Lazy execution
* ✅ Pull-based (consumer controls the pace)
* ✅ Built-in backpressure
* ✅ Works with sync & async iterables
* ✅ Zero dependencies
* ✅ Small API surface

---

## Installation

```bash
npm install async-pipe
```

---

## Basic Usage

```js
import { pipe, map, filter, take } from "async-pipe";

const pipeline = pipe(
  [1, 2, 3, 4, 5],
  map(x => x * 10),
  filter(x => x > 20),
  take(2)
);

for await (const value of pipeline) {
  console.log(value);
}
```

**Output**

```
30
40
```

---

## API

### `pipe(source, ...operators)`

Composes operators **left to right**.

```js
pipe(iterable, op1, op2, op3)
```

Execution starts only when iterated.

---

### Operators

#### `map(fn)`

Transforms values.

```js
map(x => x * 2)
```

---

#### `filter(predicate)`

Filters values.

```js
filter(x => x > 10)
```

---

#### `take(n)`

Takes only `n` items and **stops upstream iteration**.

```js
take(5)
```

---

#### `tap(fn)`

Performs side effects without changing values.

```js
tap(console.log)
```

---

#### `delay(ms)`

Delays **before yielding** each value.

```js
delay(500)
```

---

#### `rateLimit(ms)`

Enforces a minimum delay **between items**.

```js
rateLimit(1000)
```

---

## Backpressure (Important)

### What is backpressure?

> **Backpressure means the consumer controls the producer.**

In `async-pipe`:

* Data is pulled, not pushed
* Upstream sources produce values **only when requested**

---

### Why this matters

Without backpressure:

* APIs keep fetching
* DB cursors keep reading
* Memory grows unnecessarily

With `async-pipe`:

* Iteration stops immediately when the consumer stops
* Resources are released correctly

---

### Example: Early termination

```js
async function* source() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("cleaned up");
  }
}

for await (const x of pipe(source(), take(1))) {
  break;
}
```

**Output**

```
cleaned up
```

✔ Upstream iterator is properly closed
✔ No wasted work

---

## Laziness Guarantee

Nothing runs until you iterate.

```js
let executed = false;

const pipeline = pipe(
  [1, 2, 3],
  map(x => {
    executed = true;
    return x;
  })
);

console.log(executed); // false

for await (const _ of pipeline) {
  break;
}

console.log(executed); // true
```

---

## Sync + Async Sources

Works with:

* Arrays
* Generators
* Async generators
* Streams (via adapters)

```js
async function* asyncSource() {
  yield 1;
  await delay(100);
  yield 2;
}

for await (const x of pipe(asyncSource(), map(x => x * 10))) {
  console.log(x);
}
```

---

## Why not RxJS?

| async-pipe             | RxJS               |
| ---------------------- | ------------------ |
| Pull-based             | Push-based         |
| Native async iterators | Custom Observable  |
| Minimal API            | Large surface area |
| Backend-friendly       | UI-focused         |
| Zero deps              | Heavy runtime      |

**Use async-pipe when:**

* You process data
* You control consumption
* You care about backpressure

---

## Design Philosophy

* Iteration is a **protocol**, not a loop
* Operators should be:

  * Stateless
  * Composable
  * Lazy
* Short-circuiting operators **must close upstream iterators**

---

## Roadmap

* Concurrency operator
* Retry with backoff
* AbortController support
* TypeScript-first API

---

## License

MIT

---

### Final note (keep this)

> async-pipe is intentionally small.
> If you need push-based event streams, use RxJS.
> If you need **controlled, lazy data processing**, use async-pipe.

---

If you want, next I can:

* Tighten the language for npm discoverability
* Add diagrams (ASCII or SVG)
* Write a **“Why backpressure matters” blog post**
* Convert this to a polished **OSS landing README**

Just tell me 👌
