const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/transaction-ending-required');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('transaction-ending-required', rule, {
  valid: [
    `
      async function test() {
        const trx = transaction.start(knex);
        await trx.commit();
        return true;
      }
    `,
    `
      async function test() {
        const trx = transaction.start(knex);
        (function () {})();
        await trx.commit();
        return true;
      }
    `,
    `
      async function test() {
        const trx = transaction.start(knex);
        [1, 2].map(i => i * 2);
        await trx.commit();
        return true;
      }
    `,
    `
      const test = async () => {
        const trx = transaction.start(knex);
        [1, 2].map(i => i * 2);
        await trx.commit();
        return true;
      }
    `,
    `
      class Test {
        async update() {
          const trx = transaction.start(knex);
          await trx.commit();
          return true;
        }
      }
    `,
  ],
  invalid: [
    {
      code: `
        async function test(option) {
          const trx = transaction.start(knex);
          if (option === false) {
            return;
          }
          await trx.commit();
        }
      `,
      errors: [{ messageId: 'missing', type: 'ReturnStatement' }],
    },
    {
      code: `
        async function test(option) {
          const trx = transaction.start(knex);
          while (1) {
            if (option === true) return;
          }
          await trx.commit();
        }
      `,
      errors: [{ messageId: 'missing', type: 'ReturnStatement' }],
    },
    {
      code: `
        async function test(option) {
          const trx = transaction.start(knex);
          if (option === true) {
            await trx.commit();
          }
        }
      `,
      errors: [{ messageId: 'missing', type: 'FunctionDeclaration' }],
    },
  ],
});
