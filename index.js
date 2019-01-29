// const awaitInvoke = require('./lib/rules/await-invoke');
// const awaitPublish = require('./lib/rules/await-publish');
// const limitBeforeFirst = require('./lib/rules/limit-before-first');
const metaDescription = require('./lib/rules/meta-description');
const metaExport = require('./lib/rules/meta-export');
const metaPermissions = require('./lib/rules/meta-permissions');

module.exports = {
  configs: {
    recommended: {
      extends: [
        'airbnb-base',
      ],
      plugins: [
        'cubyn',
      ],
      env: {
        es6: true,
        // jest: true,
        node: true,
      },
      rules: {
        //
        // Cubyn rules
        //

        // 'cubyn/await-invoke': 'off',
        // 'cubyn/await-publish': 'off',
        // 'cubyn/limit-before-first': 'off',
        // 'cubyn/meta-description': 'off',
        // 'cubyn/meta-export': 'off',
        // 'cubyn/meta-permissions': 'off',

        //
        // Airbnb rules
        //

        // Activations/updates

        'max-depth': ['error', 4],
        'no-eq-null': 'error',
        'no-implicit-globals': 'error',
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'no-useless-call': 'error',
        'no-undefined': 'error',
        'no-shadow': 'error',
        'line-comment-position': ['error', {
          position: 'above',
          ignorePattern: '',
          applyDefaultPatterns: true,
        }],
        'no-useless-catch': 'error',
        'prefer-object-spread': 'error',
        'max-nested-callbacks': ['error', { max: 3 }],
        'no-magic-numbers': ['error', {
          ignoreArrayIndexes: true,
          ignore: [0, 1],
          enforceConst: true
        }],
        complexity: ['error', 5],
        'object-curly-newline': ['error', {
          ObjectExpression: { consistent: true, multiline: true },
          ObjectPattern: { consistent: true, multiline: true },
        }],

        // Deactivations

        'no-plusplus': 'off',
        'no-use-before-define': 'off',
      },
      overrides: [
        // {
        //   files: [
        //     'src/controllers/**/index.js',
        //     'src/lambdas/**/index.js',
        //     'src/listeners/**/index.js',
        //   ],
        //   rules: {
        //     'cubyn/await-invoke': 'error',
        //     'cubyn/await-publish': 'error',
        //     'cubyn/limit-before-first': 'error',
        //     'cubyn/meta-description': 'error',
        //     'cubyn/meta-export': 'error',
        //     'cubyn/meta-permissions': 'error',
        //   },
        // },
        {
          files: [
            '*.spec.js',
          ],
          rules: {
            'no-magic-numbers': 'off',
            'max-nested-callbacks': ['error', { max: 5 }],
          },
        },
      ],
    },
  },
  rules: {
    // 'await-invoke': awaitInvoke,
    // 'await-publish': awaitPublish,
    // 'limit-before-first': limitBeforeFirst,
    // 'meta-description': metaDescription,
    // 'meta-permissions': metaPermissions,
    // 'meta-export': metaExport,
  },
};
