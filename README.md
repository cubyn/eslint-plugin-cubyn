# eslint-plugin-cubyn

> Enforce Cubyn standard style

Contains:

* Cubyn VNext rules (disable in `v2.1.0`)
* Airbnb based rules, with some activations, updates and deactivations

ESLint [rules explanations](https://eslint.org/docs/rules/).

## Installation

```bash
$ yarn add -D eslint-plugin-cubyn
```

`eslint`, `eslint-config-airbnb-base` and `eslint-plugin-import` packages are peer dependencies of Cubyn linter, there is no need to add them.

## Usage

Copy the following configuration in the root `.eslintrc.js` file:

```js
module.exports = {
  extends: [
    'plugin:cubyn/recommended',
    'plugin:jest/recommended',
  ],
  plugins: [
    'jest',
  ],
  env: {
    'jest/globals': true,
  },
}
```
