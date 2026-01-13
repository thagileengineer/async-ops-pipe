export const filter = predicate => async function* (iterable){
    for await (const item of iterable){
        if(predicate(item)){
            yield item
        }
    }
}