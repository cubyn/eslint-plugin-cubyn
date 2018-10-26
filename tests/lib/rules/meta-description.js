const rule = require('../../../lib/rules/meta-description');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('meta-description', rule, {
  valid: [
    'const meta = { description: "Lorem ipsum dolor sit amet." };',
    'const meta = { description: "Lorem ipsum dolor sit amet.", key2: "value2" };',
  ],
  invalid: [
    {
      code: 'const meta = {};',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const meta = { description: null };',
      errors: [{ messageId: 'missing', type: 'Program' }]
    },
    {
      code: 'const meta = { description: "" };',
      errors: [{ messageId: 'missing', type: 'Program' }]
    }
  ]
});
