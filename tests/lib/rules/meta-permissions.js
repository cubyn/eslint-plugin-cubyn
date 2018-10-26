const rule = require('../../../lib/rules/meta-permissions');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('meta-permissions', rule, {
  valid: [
    'const meta = { permissions: ["object.action"] };',
    'const meta = { permissions: ["object.action1", "object.action2"] };'
  ],
  invalid: [
    {
      code: 'const meta = {};',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const meta = { permissions: null };',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const meta = { permissions: [] };',
      errors: [{ messageId: 'missing', type: 'Program' }]
    }
  ]
});
