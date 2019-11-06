const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/knex-try-trx');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('knex-try-trx', rule, {
  valid: [
    `
      async function test() {
        const trx = await transaction.start(knex);

        try {
          await trx.commit();
        } catch (error) {
          await trx.rollback();
        }
      }
    `,
    `
      async function test() {
        const myTrx = await transaction.start(knex);
        const anotherVariable = undefined;

        function anotherFunction() {}

        try {
          anotherFunction();
          await myTrx.commit();
        } catch (error) {
        }
      }
    `,
    // Weird but possible case
    `
      async function test() {
        const trx = await transaction.start(knex);

        try {
        } catch (error) {
          await trx.commit();
        }
      }
    `,
  ],
  invalid: [
    {
      code: `
        async function test() {
          const trx = await transaction.start(knex);
        }
      `,
      errors: [{ messageId: 'missing', type: 'MemberExpression' }],
    },
    {
      code: `
        async function test() {
          const trx = await transaction.start(knex);

          try {
          } catch (err) {
          }
        }
      `,
      errors: [{ messageId: 'missing', type: 'MemberExpression' }],
    },
  ],
});
