const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/await-publish');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('await-publish', rule, {
  valid: [
    `
    async function handler() {
      const publish = () => new Promise();
      await publish("topic/parcel.created:v1");
    }`,
  ],
  invalid: [
    {
      code:
    `
    async function handler() {
      const publish = () => new Promise();
      publish("topic/parcel.created:v1");
    }`,
      errors: [{ messageId: 'missing', type: 'Identifier' }],
    },
  ],
});
