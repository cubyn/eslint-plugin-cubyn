const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/logger-error-param');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('logger-error-param', rule, {
  valid: [
    'logger.error("error message", { error: "Error", id: 1 });',
    'logger.info("error message", { details: true });',
    'logger.log("error message", { error: {} });',
  ],
  invalid: [
    {
      code: 'logger.error("error message");',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
    {
      code: 'logger.error("error message", { error: null });',
      errors: [{ messageId: 'missing', type: 'CallExpression' }],
    },
  ],
});
