const sleep = ms => new Promise(r => setTimeout(r, ms));

export const retry = ({
    retries = 3,
    delay = 0,
    shouldRetry = () => true
} = {}) => async function* (iterable) {
    let attempt = 0;

    while(true){
        try {
            yield item;
            break;
        } catch (error) {
            attempt++;
            if(attempt > retries || shouldRetry(err)){
                throw err;
            }
            if(delay) await sleep(delay)
        }
    }
}