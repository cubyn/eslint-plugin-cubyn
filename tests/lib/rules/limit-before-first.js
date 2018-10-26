const rule = require('../../../lib/rules/limit-before-first');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('limit-before-first', rule, {
  valid: [
    `
    const Contract = () => {};
    Contract.query().limit(1).first();
    `,
    `
    const Contract = () => {};
    Contract.query().limit(2).select('id').first();
    `
  ],
  invalid: [
    {
      code:
      `
    const Contract = () => {};
    Contract.query().first();
      `,
      errors: [{ messageId: 'missing', type: 'Identifier' }]
    },
    {
      code:
      `
    const Contract = () => {};
    Contract.query().first().limit(1);
      `,
      errors: [{ messageId: 'missing', type: 'Identifier' }]
    }
  ]
});
