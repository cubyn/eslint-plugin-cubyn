const loggerContext = require('./lib/rules/logger-context');
const loggerErrorParam = require('./lib/rules/logger-error-param');
const metaPermissions = require('./lib/rules/meta-permissions');
const noInvokeTopic = require('./lib/rules/no-invoke-topic');
const transaction = require('./lib/rules/transaction');

const RULES = {
  CUBYN: {
    // Activations/updates
    'cubyn/logger-context': 'error',
    'cubyn/logger-error-param': 'error',
    'cubyn/no-invoke-topic': 'error',
    'cubyn/transaction': 'error',
    // Deactivations
    'cubyn/meta-permissions': 'off',
  },
  UNICORN: {
    // Activations/updates
    'unicorn/import-index': 'error',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-for-loop': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/regex-shorthand': 'error',
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
  },
  AIRBNB: {
    // Activations/updates
    'no-eq-null': 'error',
    'no-implicit-globals': 'error',
    'no-shadow': 'error',
    'no-undefined': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'prefer-object-spread': 'error',
    complexity: ['error', 10],
    'max-depth': ['error', 4],
    'max-statements-per-line': ['error', { max: 1 }],
    'max-nested-callbacks': ['error', { max: 4 }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'id-length': ['error', {
      min: 3,
      properties: 'never',
      exceptions: ['fs', 'os', 'vm', 'i', 'id'],
    }],
    'line-comment-position': ['error', {
      position: 'above',
      applyDefaultPatterns: true,
    }],
    'no-magic-numbers': ['error', {
      ignoreArrayIndexes: true,
      ignore: [-1, 0, 1, 2, 10],
      enforceConst: true,
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: { consistent: true, multiline: true },
      ObjectPattern: { consistent: true, multiline: true },
    }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var', 'expression'] },
    ],
    // Deactivations
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
  },
};

module.exports = {
  configs: {
    recommended: {
      extends: [
        'airbnb-base',
      ],
      plugins: [
        'unicorn',
        'cubyn',
      ],
      env: {
        es6: true,
        node: true,
      },
      rules: {
        ...RULES.CUBYN,
        ...RULES.UNICORN,
        ...RULES.AIRBNB,
      },
      overrides: [
        {
          files: [
            'src/controllers/**/*.js',
          ],
          rules: {
            'cubyn/meta-permissions': 'error',
          },
        },
        {
          files: [
            'src/controllers/**/index.js',
            'src/lambdas/**/index.js',
            'src/listeners/**/index.js',
          ],
          rules: {
            'no-param-reassign': ['error', {
              props: true,
              ignorePropertyModificationsFor: ['data', 'context'],
            }],
          },
        },
        {
          files: [
            '*.spec.js',
            'tests/**',
          ],
          rules: {
            'id-length': 'off',
            'max-nested-callbacks': ['error', { max: 10 }],
            'no-magic-numbers': 'off',
          },
        },
      ],
    },
  },
  rules: {
    'logger-context': loggerContext,
    'logger-error-param': loggerErrorParam,
    'meta-permissions': metaPermissions,
    'no-invoke-topic': noInvokeTopic,
    transaction,
  },
};
