const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/meta-permissions');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('meta-permissions', rule, {
  valid: [
    'const meta = { description: "", permissions: ["object.action"] };',
    'const meta = { permissions: ["object.action1", "object.action2"] };',
    'const meta = { permissions };',
    'meta.permissions = ["object.action"];',
    'meta.permissions = [];',
    'meta.permissions = perm;',
  ],
  invalid: [
    {
      code: 'const meta = {};',
      errors: [{ messageId: 'missing', type: 'VariableDeclarator' }],
    },
    {
      code: 'const meta = { permissions: null };',
      errors: [{ messageId: 'missing', type: 'VariableDeclarator' }],
    },
    {
      code: 'meta.permissions = {};',
      errors: [{ messageId: 'missing', type: 'AssignmentExpression' }],
    },
    {
      code: 'meta.permissions = null;',
      errors: [{ messageId: 'missing', type: 'AssignmentExpression' }],
    },
  ],
});
