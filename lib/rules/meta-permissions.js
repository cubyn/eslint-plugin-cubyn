module.exports = {
  meta: {
    docs: {
      description: 'Enforce write permissions on meta',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Permissions required but not found.',
    },
  },
  create: (context) => {
    const arePermissionsExistsObjectVariant = (properties) => {
      const permissionsKey = properties.find(property => (
        property.type === 'Property'
        && property.key.type === 'Identifier'
        && property.key.name === 'permissions'
        && (property.shorthand === true
          || (property.value.type === 'ArrayExpression' && property.value.elements.length))
      ));

      return !!permissionsKey;
    };

    const arePermissionsExistsAssignmentVariant = node => (
      node.type === 'ArrayExpression'
      || node.type === 'Identifier');

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
