const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/meta-presence');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('meta', rule, {
  valid: [
    `
    const meta = { key: 1 };

    module.exports = { meta };
    `,
  ],
  invalid: [
    {
      code: '',
      errors: [{ messageId: 'missing', type: 'Program' }],
    },
    {
      code: 'const a = 123;',
      errors: [{ messageId: 'missing', type: 'Program' }],
    },
    {
      code: 'const meta = null;',
      errors: [{ messageId: 'missing', type: 'Program' }],
    },
    {
      code: 'const meta = {};',
      errors: [{ messageId: 'missing', type: 'Program' }],
    },
    {
      code:
      `
      async function handler({ data }) {};

      const meta = { key: 1 };

      module.exports = { handler };
      `,
      errors: [{ messageId: 'missing', type: 'Program' }],
    },
  ],
});
