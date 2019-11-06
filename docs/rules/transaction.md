# Enforce best practices when using transaction.start()

* Should await `transaction.start`, `trx.commit`, `trx.rollback`
* Should always end transactions
* `transaction.start` should be followed by try/catch

## Rule Details

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
