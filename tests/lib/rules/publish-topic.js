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
    `
    async function handler({ publish }) {
      return publish('topic/item.created:v1');
    }`,
    `
    async function handler({ publish }) {
      const events = ['topic/parcel.created:v1'];
      await Promise.all(events.map(evt => publish(evt)));
    }`,
    `
    async function handler({ publish }) {
      return Promise.all(['item.updated:v2', 'order.updated:v1'].map(evt => publish(evt)));
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
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
      output: `
      async function handler() {
        const publish = () => new Promise();
        await publish("topic/item.created:v1");
      }`,
    },
    {
      code:
      `
      async function handler({ publish }) {
        return Promise.all([
          publish('topic/collect.created:v1'),
          publish('parcel.created:v1'),
        ]);
      }`,
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
      output: `
      async function handler({ publish }) {
        return Promise.all([
          publish('topic/collect.created:v1'),
          publish('topic/parcel.created:v1'),
        ]);
      }`,
    },
  ],
});
