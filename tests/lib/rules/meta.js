const rule = require('../../../lib/rules/meta');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('meta', rule, {
  valid: ['const meta = { key: "value" };'],
  invalid: [
    {
      code: '',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const a = 123;',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const meta = null;',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const meta = {};',
      errors: [{ messageId: 'missing', type: 'Program' }]
    }
  ]
});
