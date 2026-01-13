export const tap = fn => async function* (iterable) {
    for await (const item of iterable){
        fn(item);
        yield item;
    }
}