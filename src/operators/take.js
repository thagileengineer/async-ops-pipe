export const take = count => async function* (iterable) {
    let taken = 0;
    for await (const item of iterable){
        if(taken++ >= count) return
        yield item;
    }
}