# eslint-plugin-cubyn

> Enforce Cubyn standard style

Contains Cubyn VNext rules and Airbnb rules activations, updates and deactivations.

ESLint [rules explanations](https://eslint.org/docs/rules/)

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
