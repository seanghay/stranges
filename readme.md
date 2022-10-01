# Stranges

An advanced number range parser. It parses number ranges from string.


## Installation

```
npm install stranges
```

## Features

- Parse single and multiple ranges. e.g. `1-10,20-30`
- Parse inverted range. e.g. `10-1`
- Returns an `Iterator` instead of an `Array` which makes thing faster when iterate over million of records. 
- Reduce memory usage.

---

### Parse single range

```js
import parse from 'stranges';

const iterator = parse('0-9'); // Symbol.iterator

for (const num of iterator) {
  console.log(num);
}

// => 1
// => 2
// => 3
// => 4
// => 5
// => 6
// => 7
// => 8
// => 9
```

### Parse multiple ranges

```js
import parse from 'stranges';

const iterator = parse('0-3,3-0'); // Symbol.iterator

for (const num of iterator) {
  console.log(num);
}

// => 1
// => 2
// => 3
// => 3
// => 2
// => 1
// => 0
```

---

### Calculate Length of Ranges

```js
import { length } from 'stranges';

length('0-9,20-29')
// => 20
```

---

### Parse as an Array

Allocate an array filled with values.


```js
import { parseAsArray } from 'stranges';

parseAsArray('0-10')
// => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## Types

```typescript
/**
 * Calculate total count of ranges.
 * @param input a range string
 * @param separator a separator use to split each range.
 * @returns a total count of ranges.
 */
declare function length(input: string, separator?: string): number;
/**
 * Create an array filled with range values.
 * @param input a range string
 * @param separator a separator use to split each range.
 * @returns an array filled with range values.
 */
declare function parseAsArray(input: string, separator?: string): number[];
/**
 * Create an iterator of ranges.
 * @param input a range string
 * @param separator a separator use to split each range.
 * @returns an iterator of each number
 */
declare function parse(input: string, separator?: string): Generator<number>;

export { parse as default, length, parseAsArray };
```

