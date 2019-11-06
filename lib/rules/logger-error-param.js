module.exports = {
  meta: {
    docs: {
      description: 'Enforce passing Carotte error parameter to logger.error function',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Error parameter error required but not found.',
    },
  },
  create: (context) => {
    const isParamErrorExists = (properties) => {
      const errorParam = properties.find((property) => (
        property.type === 'Property'
        && property.value.value !== null
      ));

      return !!errorParam;
    };

    const linterRule = (node) => {
      const [, params] = node.arguments;

      if (!params || !isParamErrorExists(params.properties)) {
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
