function cache() {
    const cacheData = new Map();
    return function(num) {
        console.time('Timer Label');
        if (cacheData.get(num)) {
            console.timeEnd('Timer Label');
            return cacheData.get(num);
        } 

        let mult = 1;
        for (let i = 1; i <= num; i++) {
            mult *= i;
        }

        cacheData.set(num, mult);
        const arr = cacheData.map((value, key)=>{
            console.log('value', value, key);
        })
        console.log(arr);
        console.timeEnd('Timer Label');
        return mult;
    }
}

const fact = cache();
console.log(fact(10));   // First computation
console.log(fact(5));  // First computation for a larger number
console.log(fact(4));   // Cached result
