const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/publish-topic');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('publish-topic', rule, {
  valid: [
    'publish("topic/");',
    'function handler({ publish }) {};',
    `
    async function handler({ data, invoke, publish }) {
      publish('topic/item.created:v1');
    }`,
  ],
  invalid: [
    {
      code:
      `
      async function handler() {
        const publish = () => new Promise();
        await publish("item.created:v1");
      }`,
      errors: [{ messageId: 'missing', type: 'Identifier' }],
      output: `
      async function handler() {
        const publish = () => new Promise();
        await publish("topic/item.created:v1");
      }`,
    },
  ],
});
