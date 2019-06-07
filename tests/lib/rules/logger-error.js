const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/logger-error');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('logger-error', rule, {
  valid: [
    'logger.info("error message", { error });',
    'logger.warn("", { id: 1, context, error });',
    'logger.log("error message", { error: {}, id: 1 });',
    'logger.error("error message", { error: "Error", id: 1 });',
    'logger.test("error message", { id: 1 });',
  ],
  invalid: [
    {
      code: 'logger.warn("error message", {});',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.info("error message", { err });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", { error: null });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
  ],
});
