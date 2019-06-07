const loggerContext = require('./lib/rules/logger-context');
const publishTopic = require('./lib/rules/publish-topic');

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
        //
        // Cubyn rules
        //

        // Activations/updates

        'cubyn/logger-context': 'error',
        'cubyn/publish-topic': 'error',

        //
        // Unicorn rules
        //

        // Activations/updates

        'unicorn/filename-case': ['error', { case: 'kebabCase' }],
        'unicorn/import-index': 'error',
        'unicorn/no-array-instanceof': 'error',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-new-buffer': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/regex-shorthand': 'error',

        //
        // Airbnb rules
        //

        // Activations/updates

        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'id-length': ['error', {
          min: 3,
          properties: 'never',
          exceptions: ['fs', 'os', 'vm', 'i', 'id'],
        }],
        'line-comment-position': ['error', {
          position: 'above',
          applyDefaultPatterns: true,
        }],
        'max-depth': ['error', 4],
        'max-nested-callbacks': ['error', { max: 4 }],
        'max-statements-per-line': ['error', { max: 1 }],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
        'no-eq-null': 'error',
        'no-implicit-globals': 'error',
        'no-magic-numbers': ['error', {
          ignoreArrayIndexes: true,
          ignore: [-1, 0, 1, 2, 10],
          enforceConst: true,
        }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
        'no-shadow': 'error',
        'no-undefined': 'error',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'object-curly-newline': ['error', {
          ObjectExpression: { consistent: true, multiline: true },
          ObjectPattern: { consistent: true, multiline: true },
        }],
        'padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: 'return',
          },
          {
            blankLine: 'always',
            prev: ['const', 'let', 'var'],
            next: '*',
          },
          {
            blankLine: 'any',
            prev: ['const', 'let', 'var'],
            next: ['const', 'let', 'var', 'expression'],
          },
        ],
        'prefer-object-spread': 'error',
        complexity: ['error', 10],

        // Deactivations

        'no-plusplus': 'off',
        'no-use-before-define': 'off',
      },
      overrides: [
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
    'publish-topic': publishTopic,
  },
};
