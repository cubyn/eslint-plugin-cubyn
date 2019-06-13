module.exports = {
  meta: {
    docs: {
      description: 'Enforce to await publish',
      category: 'Carotte issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Await before publish required but not found.',
    },
  },
  create: (context) => {
    const isAwaitExists = (node) => {
      return node.parent.type === 'AwaitExpression';
    };

    const isReturnPublish = (node) => {
      return node.parent.type === 'ReturnStatement';
    };

    const isInArrayPublish = (node) => {
      return node.parent.type === 'ArrayExpression';
    };

    const isPushArrayPublish = (node) => {
      if (node.parent.callee && node.parent.callee.property) {
        const { type, name } = node.parent.callee.property;

        return type === 'Identifier' && name === 'push';
      }

      return false;
    };

    const linterRule = (node) => {
      // console.log(node.callee.parent.parent.parent.parent);
      const a = node.callee.parent.parent.parent.parent;
      console.log(a.callee.object.name);
      console.log(a.callee.property.name);
      const { parent } = node.callee;

      if (!isAwaitExists(parent) && !isReturnPublish(parent) && !isInArrayPublish(parent) && !isPushArrayPublish(parent)) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    };

    return {
      'CallExpression[callee.type=Identifier][callee.name=publish]': linterRule,
    };
  },
};
