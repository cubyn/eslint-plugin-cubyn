# Enforce meta usage in Controllers, Lambdas and Listeners files (meta)

## Rule Details

This rule enforces that a is meta object present in files:
  * `src/controllers/**/index.js`
  * `src/lambdas/**/index.js`
  * `src/listeners/**/index.js`

Examples of **incorrect** code for this rule:

```js
// src/controllers/parcels.list:v1

async function handler({ data }) {
  // ...
}

module.exports = { handler };
```

Examples of **correct** code for this rule:

```js
// src/controllers/parcels.list:v1

async function handler({ data }) {
  // ...
}

const meta = {};

module.exports = { handler, meta };
```
