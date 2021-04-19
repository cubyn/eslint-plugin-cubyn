# eslint-plugin-cubyn

> Enforce Cubyn standard style

Contains:

* Carotte rules
* [Airbnb based rules](https://github.com/airbnb/javascript), with some activation, updates and deactivation
* Few [Unicorn rules](https://github.com/sindresorhus/eslint-plugin-unicorn)

## Why a linter?

* Apply community best practices
* Avoid errors in code
* Improve code quality
* Gives immediate feedback about a piece of code
* Make Pull Requests follow a code standard

## Why a rule breaks my code?

ESLint [rules explanations](https://eslint.org/docs/rules/).

Search on web why this rule exists.

## Can I disable a rule?

No. Modifies the code to match the rule.
(There are exceptions)

## Installation

~~`eslint`, `eslint-config-airbnb-base`, `eslint-plugin-jest` and `eslint-plugin-import` packages are peer dependencies of Cubyn linter, there is no need to add them.~~

Since there were bugs ([1](https://github.com/airbnb/javascript/issues/1913) and [2](https://github.com/eslint/eslint/issues/8547)) in Yarn dependencies resolutions, the following packages must be installed as dev dependencies:

```bash
yarn add -D \
  eslint \
  eslint-config-airbnb-base \
  eslint-plugin-import \
  eslint-plugin-cubyn \
  eslint-plugin-jest \
  eslint-plugin-unicorn
```

Project's `devDependencies` must contains:

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

## Release

### Test your changes

Linking your project to use the local version of the package.

```bash
$ cd eslint-plugin-cubyn
$ yarn link
$ cd ../service-scub # or other package using 'eslint-plugin-cubyn'
$ yarn link eslint-plugin-cubyn
$ yarn install

# Test your changes
$ yarn lint

# Unlink
$ cd eslint-plugin-cubyn
$ yarn unlink
$ cd ../service-scub # or other package using 'eslint-plugin-cubyn'
$ yarn unlink eslint-plugin-cubyn
$ yarn install --check-files
```

Run project tests

```bash
$ cd eslint-plugin-cubyn
$ yarn test
```

### Git flow release

Bump the package version and release your changes with git flow.

### Npm publish

```bash
$ cd eslint-plugin-cubyn
$ npm publish
```

### Bump services to the new version
