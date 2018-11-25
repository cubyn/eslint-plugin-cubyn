const awaitInvoke = require('./lib/rules/await-invoke');
const awaitPublish = require('./lib/rules/await-publish');
const limitBeforeFirst = require('./lib/rules/limit-before-first');
const metaDescription = require('./lib/rules/meta-description');
const metaExport = require('./lib/rules/meta-export');
const metaPermissions = require('./lib/rules/meta-permissions');

module.exports = {
  configs: {
    recommended: {
      extends: [
        'airbnb-base',
      ],
      plugins: ['cubyn'],
      env: {
        es6: true,
        jest: true,
        node: true,
      },
      rules: {
        'cubyn/await-invoke': 'off',
        'cubyn/await-publish': 'off',
        'cubyn/limit-before-first': 'off',
        'cubyn/meta-description': 'off',
        'cubyn/meta-export': 'off',
        'cubyn/meta-permissions': 'off',

        'max-depth': ['error', 3],
        'max-len': ['error', 100, 2, { ignoreStrings: false }],
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-use-before-define': 'off',
        complexity: ['error', 5],
        'object-curly-newline': ['error', {
          ObjectExpression: { consistent: true, multiline: true },
          ObjectPattern: { consistent: true, multiline: true },
        }],
      },
      overrides: [
        {
          files: [
            'src/controllers/**/index.js',
            'src/lambdas/**/index.js',
            'src/listeners/**/index.js',
          ],
          rules: {
            'cubyn/await-invoke': 'error',
            'cubyn/await-publish': 'error',
            'cubyn/limit-before-first': 'error',
            'cubyn/meta-description': 'error',
            'cubyn/meta-export': 'error',
            'cubyn/meta-permissions': 'error',
          },
        },
      ],
    },
  },
  rules: {
    'await-invoke': awaitInvoke,
    'await-publish': awaitPublish,
    'limit-before-first': limitBeforeFirst,
    'meta-description': metaDescription,
    'meta-permissions': metaPermissions,
    'meta-export': metaExport,
  },
};
