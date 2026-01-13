/**
 * applies the operators on the source in the order of provided arguements
 * @param {*} source 
 * @param  {...any} operators 
 * @returns final result
 */
export function pipe(source, ...operators){
    return operators.reduce(
        (iterable, operator)=> operator(iterable),
        source
    );
}