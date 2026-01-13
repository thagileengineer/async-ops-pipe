const sleep = ms => new Promise(r => setTimeout(r, ms));

export const delay = timeMs => async function* (iterable) {
    for await (const item of iterable){
        await sleep(timeMs);
        yield item;
    }
}