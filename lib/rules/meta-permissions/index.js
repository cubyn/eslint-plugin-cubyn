const meta = require('./meta');
const {
  arePermissionsExistsObjectVariant,
  arePermissionsExistsAssignmentVariant,
} = require('./utils');

module.exports = {
  meta,
  create: (context) => {
    const linterRuleObjectVariant = (node) => {
      if (!arePermissionsExistsObjectVariant(node.init.properties)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    const linterRuleAssignmentVariant = (node) => {
      if (!arePermissionsExistsAssignmentVariant(node.right)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    return {
      'VariableDeclarator[id.name=meta][init.type=ObjectExpression]': linterRuleObjectVariant,
      'AssignmentExpression[left.type=MemberExpression][left.object.name=meta][left.property.name=permissions]': linterRuleAssignmentVariant,
    };
  },
};
