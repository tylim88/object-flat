# object-flat

[![npm](https://img.shields.io/npm/v/object-flat)](https://www.npmjs.com/package/object-flat) [![GitHub](https://img.shields.io/github/license/tylim88/object-flat)](https://github.com/tylim88/object-flat/blob/master/LICENSE) [![tylim88](https://circleci.com/gh/tylim88/object-flat.svg?style=shield)](<[LINK](https://github.com/tylim88/object-flat#object-flat)>) [![dependencies](https://img.shields.io/badge/dynamic/json?url=https://api.npmutil.com/package/object-flat&label=dependencies&query=$.dependencies.count)](https://www.npmjs.com/package/object-flat?activeTab=dependencies)

🐤 flat nested object and return with accurate typing.

🥰 0 dependency.

⛲️ Out of box typescript support.

🦺 Tested.

## Installation

```bash
npm i object-flat
```

## 🎵 Usage

flatten nested object into flat object, you can define what character to join the nested key path.

NOTE: does not flatten array and what inside the array.

```ts
import flatten from 'object-flat'

const flattenObj = flatten(
	{ a: 1, b: { c: 3, d: { e: 4 } }, f: { g: { h: 'a', j: [{ a: 1 }] } } }, // target
	'.' // character to join the key path.
)
// return { a: 1, 'b.c': 3, 'b.d.e': 4, 'f.g.h': 'a', 'f.g.j': [{ a: 1 }]},
// type is { a: number, 'b.c': number, 'b.d.e': number, 'f.g.h': string, 'f.g.j': { a: number }[]]}
```
