// const metaPermissions = require('./lib/rules/meta-permissions');

module.exports = {
  configs: {
    recommended: {
      extends: [
        'airbnb-base',
      ],
      env: {
        es6: true,
        node: true,
      },
      rules: {
        //
        // Cubyn rules
        //

        // 'cubyn/meta-permissions': 'off',

        //
        // Airbnb rules
        //

        // Activations/updates

        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'id-length': ['error', { min: 3, properties: 'never' }],
        'line-comment-position': ['error', {
          position: 'above',
          ignorePattern: '',
          applyDefaultPatterns: true,
        }],
        'max-depth': ['error', 4],
        'max-nested-callbacks': ['error', { max: 3 }],
        'max-statements-per-line': ['error', { max: 1 }],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
        'no-eq-null': 'error',
        'no-implicit-globals': 'error',
        'no-magic-numbers': ['error', {
          ignoreArrayIndexes: true,
          ignore: [ -1, 0, 1, 2, 10],
          enforceConst: true
        }],
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
        // {
        //   files: [
        //     'src/controllers/**/index.js',
        //     'src/lambdas/**/index.js',
        //     'src/listeners/**/index.js',
        //   ],
        //   rules: {
        //     'cubyn/meta-permissions': 'error',
        //   },
        // },
        {
          files: [
            '*.spec.js',
            'tests/**',
          ],
          rules: {
            'id-length': ['off'],
            'max-nested-callbacks': ['error', { max: 5 }],
            'no-magic-numbers': 'off',
          },
        },
      ],
    },
  },
};
