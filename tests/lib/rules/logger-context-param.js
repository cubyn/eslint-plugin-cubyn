const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/logger-context-param');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('logger-context-param', rule, {
  valid: [
    'logger.info("", { context });',
    'logger.info("", { context: {} });',
    'logger.info("", { context: { foo: "bar" } });',
    'logger.warn("", { context });',
    'logger.warn("", { context: {} });',
    'logger.warn("", { context: { foo: "bar" } });',
  ],
  invalid: [
    {
      code: 'logger.warn("error message");',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", {});',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.warn("error message", { context: "foo" });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.log("error message", { context: null });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
  ],
});
