const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/transaction-await');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('trx-await', rule, {
  valid: [
    'async function test() { await trx.commit() }',
    'async function test() { await trx.rollback() }',
    // not trx
    'async function test() { transaction.commit() }',
    'async function test() { transaction.rollback() }',
  ],
  invalid: [
    {
      code: 'async function test() { trx.commit() }',
      errors: [{ messageId: 'commitMissingAwait', type: 'CallExpression' }],
    },
    {
      code: 'async function test() { trx.rollback() }',
      errors: [{ messageId: 'rollbackMissingAwait', type: 'CallExpression' }],
    },
    {
      // trx should not be returned, it makes no sense
      code: 'async function test() { return trx.rollback() }',
      errors: [{ messageId: 'rollbackMissingAwait', type: 'CallExpression' }],
    },
    {
      code: 'const a = () => trx.rollback()',
      errors: [{ messageId: 'rollbackMissingAwait', type: 'CallExpression' }],
    },
  ],
});
