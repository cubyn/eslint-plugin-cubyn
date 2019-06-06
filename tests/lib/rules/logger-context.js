const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/logger-context');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('logger-context', rule, {
  valid: [
    'logger.info("error message", { context });',
    'logger.warn("", { id: 1, context });',
    'logger.error("error message", { context: {}, id: 1 });',
    'logger.test("error message", { id: 1 });',
  ],
  invalid: [
    {
      code: 'logger.warn("error message", {});',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.log("error message", { context: null });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
  ],
});
