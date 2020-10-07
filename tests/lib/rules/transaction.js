const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/transaction');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('transaction', rule, {
  valid: [
    // most common transaction usecase
    `
      async function test() {
        const trx = await transaction.start(knex);
        try {
          await trx.commit();
          return true;
        } catch (error) {
          await trx.rollback();
          return false;
        }
      }
    `,
    // with another name
    `
      async function test() {
        const t = await transaction.start(knex);
        try {
          await t.commit();
          return true;
        } catch (error) {
          await t.rollback();
          return false;
        }
      }
    `,
    // with unrelated function inline
    `
      async function test() {
        const trx = await transaction.start(knex);
        try {
          (function () {})();
          await trx.commit();
          return true;
        } catch (error) {
          await trx.rollback();
          return false;
        }
      }
    `,
    // with asserts in try block
    `
      async function test(option) {
        const trx = await transaction.start(knex);
        try {
          assert(option === true);
          await trx.commit();
          return true;
        } catch (error) {
          await trx.rollback();
          return false;
        }
      }
    `,
    // with deep asserts in try block
    `
      async function test(option) {
        const trx = await transaction.start(knex);

        try {
          if (option.check) {
            assert(option.value === true);
          }
          await trx.commit();
          return true;
        } catch (error) {
          await trx.rollback();
          return false;
        }
      }
    `,
    // with asserts in catch block
    `
      async function test(option) {
        const trx = await transaction.start(knex);
        try {
          await trx.commit();
          return true;
        } catch (error) {
          await trx.rollback();
          assert(option === true);
          return false;
        }
      }
    `,
    // with unrelated arrow function inline
    `
      async function test() {
        const trx = await transaction.start(knex);
        try {
          [1, 2].map(i => i * 2);
          await trx.commit();
          return true;
        } catch (error) {
          await trx.rollback();
          return false;
        }
      }
    `,
    // with transaction started in an inner block
    `
      const test = async (option) => {
        if (option) {
          const trx = await transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            await trx.rollback();
            return false;
          }
        }
        return true;
      }
    `,
    // with transaction started in an inner function
    `
      const test = async (option) => {
        async function testCode() {
          const trx = await transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            await trx.rollback();
            return false;
          }
        }
        return !(await testCode());
      }
    `,
    // in a class definition
    `
      class Test {
        async update() {
          const trx = await transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            await trx.rollback();
            return false;
          }
        }
      }
    `,
  ],
  invalid: [
    // transaction not followed by try/catch
    {
      code: `
        async function test(option) {
          const trx = await transaction.start(knex);
          await trx.commit();
        }
      `,
      errors: [{ messageId: 'missingTransactionTryCatch', type: 'CallExpression' }],
    },
    // transaction.start not awaited
    {
      code: `
        async function test(option) {
          const trx = transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            await trx.rollback();
            return false;
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionStartAwait', type: 'CallExpression' }],
    },
    // transaction not awaited
    {
      code: `
        async function test(option) {
          const trx = await transaction.start(knex);
          try {
            trx.commit();
            return true;
          } catch (error) {
            await trx.rollback();
            return false;
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionEndingAwait', type: 'CallExpression' }],
    },
    // transaction not ended at return
    {
      code: `
        async function test(option) {
          const trx = await transaction.start(knex);
          try {
            return Obj.query(trx).first().limit(1);
          } catch (error) {
            await trx.rollback();
            return null;
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionEnding', type: 'ReturnStatement' }],
    },
    // transaction not ended before throw
    {
      code: `
        async function test(option) {
          const trx = await transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            throw error;
            await trx.rollback();
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionEnding', type: 'ThrowStatement' }],
    },
    // should behave the same on arrow functions
    {
      code: `
        const test = async (option) => {
          const trx = await transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            throw error;
            await trx.rollback();
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionEnding', type: 'ThrowStatement' }],
    },
    // transaction not ended before assert
    {
      code: `
        async function test(option) {
          const trx = await transaction.start(knex);
          try {
            assert(option === false);
            await trx.commit();
            return true;
          } catch (error) {
            assert(option, BadRequestError, 'Wrong option');
            await trx.rollback();
            return false;
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionEnding', type: 'CallExpression' }],
    },
    // transaction variable defined outside of method scope
    {
      code: `
        let trx;
        async function test() {
          trx = await transaction.start(knex);
          try {
            await trx.commit();
            return true;
          } catch (error) {
            await trx.rollback();
            return false;
          }
        }
      `,
      errors: [{ messageId: 'missingTransactionDeclaration', type: 'CallExpression' }],
    },
  ],
});
