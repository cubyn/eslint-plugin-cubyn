# eslint-plugin-cubyn

> Enforce Cubyn standard style

Contains:

* Carotte rules
* [Airbnb based rules](https://github.com/airbnb/javascript), with some activations, updates and deactivations
* Few [Unicorn rules](https://github.com/sindresorhus/eslint-plugin-unicorn)

## Why a linter?

* Avoid code errors
* Apply community best practices
* Improve code quality
* Gives immediate feedback
* Avoid too much discussions on PRs

## Why a rule breaks my code?

ESLint [rules explanations](https://eslint.org/docs/rules/).

Search on web why this rule exists.

## Can I disable a rule?

No. Modifies the code to match the rule.
(There are exceptions)

## Installation

~~`eslint`, `eslint-config-airbnb-base` and `eslint-plugin-import` packages are peer dependencies of Cubyn linter, there is no need to add them.~~

Since there were bugs ([1](https://github.com/airbnb/javascript/issues/1913) and [2](https://github.com/eslint/eslint/issues/8547)) in Yarn dependencies resolutions, the following packages must be installed as dev dependencies:

```bash
$ yarn add -D \
  eslint \
  eslint-config-airbnb-base \
  eslint-plugin-import \
  eslint-plugin-cubyn \
  eslint-plugin-unicorn
```

Project's `devDependencies` must contains (if Jest):

```json
"devDependencies": {
  "eslint": "^6.6.0",
  "eslint-config-airbnb-base": "^14.0.0",
  "eslint-plugin-cubyn": "^2.3.1",
  "eslint-plugin-import": "^2.18.2",
  "eslint-plugin-jest": "^23.0.3",
  "eslint-plugin-unicorn": "^12.1.0",
  "jest": "^23.5.0"
}
```

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
