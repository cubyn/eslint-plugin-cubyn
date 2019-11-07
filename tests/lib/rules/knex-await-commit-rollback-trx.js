const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/knex-await-commit-rollback-trx');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('knex-await-commit-rollback-trx', rule, {
  valid: [
    `
      async function test() {
        const trx = await transaction.start(knex);

        try {
          await trx.commit();

          return true;
        } catch (err) {
          await trx.rollback();

          return false;
        }
      }
    `,
  ],
  invalid: [
    {
      code: `
        async function test() {
          const trx = transaction.start(knex);
          trx.commit();
        }
      `,
      errors: [{ messageId: 'missingAwaitCommit', type: 'CallExpression' }],
    },
    {
      code: `
        async function test() {
          const trx = transaction.start(knex);
          trx.rollback();
        }
      `,
      errors: [{ messageId: 'missingAwaitRollback', type: 'CallExpression' }],
    },
  ],
});
