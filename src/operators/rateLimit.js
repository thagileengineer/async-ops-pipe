const sleep = ms => new Promise(r => setTimeout(r, ms));

export const rateLimit = timeMs => async function* (iterable) {
    for await (const item of iterable){
        yield fn(item)
        await sleep(timeMs);
    }
}