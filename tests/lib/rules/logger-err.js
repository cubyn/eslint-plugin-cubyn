const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/logger-err');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('logger-err', rule, {
  valid: [
    'logger.info("error message", { err });',
    'logger.warn("", { id: 1, context, err });',
    'logger.log("error message", { err: {}, id: 1 });',
    'logger.error("error message", { err: "Error", id: 1 });',
    'logger.test("error message", { id: 1 });',
  ],
  invalid: [
    {
      code: 'logger.warn("error message", {});',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.info("error message", { error });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", { err: null });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
  ],
});
