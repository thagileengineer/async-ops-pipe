/**
 * table a function and applies it on iterable in async fashion.
 * @param {*} fn 
 * @returns async generator function
 */
export const map = fn => async function* (iterable) {
    for await (const item of iterable){
        yield fn(item);
    }
}