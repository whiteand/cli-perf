# measureperf

It's an utility you can use to measure performance of some of your js functions.

## Example

Assume you have file called `concatVariants.js`.

```javascript
const arr = [1, 2, 3];
const arr2 = [3, 4, 5];

module.exports = {
  spread() {
    return [...arr, ...arr2];
  },
  method() {
    return arr.concat(arr2);
  },
  iteratorsPush() {
    const res = [];
    for (const x of arr) {
      res.push(x);
    }
    for (const x of arr2) {
      res.push(x);
    }
  },
  forLoop() {
    const res = Array(arr.length + arr2.length);
    for (let i = 0; i < arr.length; i++) {
      res[i] = arr[i];
    }
    for (let j = 0; j < arr2.length; j++) {
      res[j + arr.length] = arr2[j];
    }
    return res;
  },
};
```

And you want to findout which of the functions are the fastest.

You can run

```
npx measureperf ./concatVariants.js
```

And it will show you benchmark measurements:

```
spread x 23,610,583 ops/sec ±1.94% (76 runs sampled)
method x 7,474,967 ops/sec ±2.73% (76 runs sampled)
iteratorsPush x 29,162,670 ops/sec ±2.46% (79 runs sampled)
forLoop x 77,835,824 ops/sec ±2.52% (79 runs sampled)
Fastest is forLoop
```