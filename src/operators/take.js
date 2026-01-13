export const take = limit => async function* (iterable) {
  const iterator = iterable[Symbol.asyncIterator]?.()
    ?? iterable[Symbol.iterator]();

  let taken = 0;

  try {
    while (taken < limit) {
      const { value, done } = await iterator.next();
      if (done) return;

      taken++;
      yield value;
    }
  } finally {
    if (iterator.return) {
      await iterator.return();
    }
  }
};
