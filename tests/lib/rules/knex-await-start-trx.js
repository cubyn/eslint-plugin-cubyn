const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/knex-await-start-trx');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('knex-await-start-trx', rule, {
  valid: [
    `
      async function test() {
        const trx = await transaction.start(knex);
      }
    `,
    `
      async function test() {
        const myTrx = await transaction.start(knex);
      }
    `,
  ],
  invalid: [
    {
      code: `
        async function test() {
          const trx = transaction.start(knex);
        }
      `,
      errors: [{ messageId: 'missing', type: 'MemberExpression' }],
    },
    {
      code: `
        async function test() {
          const trxPromise = transaction.start(knex);
          const trx = await trxPromise;
        }
      `,
      errors: [{ messageId: 'missing', type: 'MemberExpression' }],
    },
  ],
});
