const awaitInvoke = require('./lib/rules/await-invoke');
const awaitPublish = require('./lib/rules/await-publish');
const limitBeforeFirst = require('./lib/rules/limit-before-first');
const meta = require('./lib/rules/meta');
const metaDescription = require('./lib/rules/meta-description');
const metaPermissions = require('./lib/rules/meta-permissions');

module.exports = {
  configs: {
    recommended: {
      plugins: ['cubyn'],
      rules: {
        'cubyn/await-invoke': 'off',
        'cubyn/await-publish': 'off',
        'cubyn/limit-before-first': 'off',
        'cubyn/meta': 'off',
        'cubyn/meta-description': 'off',
        'cubyn/meta-permissions': 'off',
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
          },
        },
        {
          files: [
            'src/controllers/**/index.js',
            'src/lambdas/**/index.js',
            'src/listeners/**/index.js',
          ],
          rules: {
            'cubyn/meta': 'error',
            'cubyn/meta-description': 'error',
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
    meta,
    'meta-description': metaDescription,
    'meta-permissions': metaPermissions,
  },
};
