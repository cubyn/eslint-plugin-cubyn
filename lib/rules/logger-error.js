module.exports = {
  meta: {
    docs: {
      description: 'Enforce passing Carotte error parameter to logger functions',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Error parameter required but not found.',
    },
  },
  create: (context) => {
    const doesParamErrorExist = (properties) => {
      const errorParam = properties.find(property => (
        property.type === 'Property'
        && property.key.type === 'Identifier'
        && property.key.name === 'error'
        && property.value.value !== null
      ));

      return !!errorParam;
    };

    const linterRule = (node) => {
      const [, params] = node.arguments;

      if (!params || !doesParamErrorExist(params.properties)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    return {
      'CallExpression[callee.object.name="logger"][callee.property.name="error"]': linterRule,
    };
  },
};
