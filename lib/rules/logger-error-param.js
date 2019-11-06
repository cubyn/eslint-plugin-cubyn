module.exports = {
  meta: {
    docs: {
      description: 'Enforce passing Carotte "error" object parameter to logger.error function',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Parameter "error" required but not found.',
    },
  },
  create: (context) => {
    const isParamErrorExists = (properties) => {
      const errorParam = properties.find((property) => (
        property.type === 'Property'
        && property.key.type === 'Identifier'
        && property.key.name === 'error'
        && (property.shorthand === true || property.value.type === 'ObjectExpression')
        // && property.value.value !== null
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
