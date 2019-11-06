const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/logger-error-param');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('logger-error-param', rule, {
  valid: [
    'logger.error("", { error });',
    'logger.error("", { error: {} });',
    'logger.error("", { error: { foo: "bar" } });',
    'logger.info("", {});',
  ],
  invalid: [
    {
      code: 'logger.error("error message");',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", {});',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", { error: "foo" });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", { error: null });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
  ],
});
