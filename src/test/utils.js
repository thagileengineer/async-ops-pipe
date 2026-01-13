export async function collect(iterable) {
  const result = [];
  for await (const item of iterable) {
    result.push(item);
  }
  return result;
}

export const delay = ms =>
  new Promise(res => setTimeout(res, ms));
