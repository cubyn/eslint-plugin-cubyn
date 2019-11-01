const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-invoke-topic');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('no-invoke-topic', rule, {
  valid: [
    'publish("topic/a");',
    'function handler({ publish }) {};',
    `
      async function handler({ data, invoke }) {
        invoke('item.create:v1');
      }
    `,
  ],
  invalid: [
    {
      code: `
        async function handler() {
          const publish = () => new Promise();
          await invoke("topic/item.created:v1");
        }
      `,
      errors: [{ messageId: 'noInvoke', type: 'CallExpression' }],
    },
  ],
});
