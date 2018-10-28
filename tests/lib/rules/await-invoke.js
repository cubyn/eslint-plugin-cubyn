const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/await-invoke');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('await-invoke', rule, {
  valid: [
    `
    async function handler() {
      const invoke = () => new Promise();
      await invoke("topic/parcel.created:v1");
    }`,
  ],
  invalid: [
    {
      code:
    `
    async function handler() {
      const invoke = () => new Promise();
      invoke("topic/parcel.created:v1");
    }`,
      errors: [{ messageId: 'missing', type: 'Identifier' }],
    },
  ],
});
