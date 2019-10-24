// function debugScope(scope) {
//   return scope ? `${debugScope(scope.upper)} - ${scope.transactionStarted ? 1 : 0}` : null;
// }

// function loc(node) {
//   return `loc(${node.loc.start.line}, ${node.loc.start.column})-(${node.loc.end.line}, ${node.loc.end.column})`;
// }

module.exports = {
  meta: {
    docs: {
      description: 'Enforce an ending of each SQL transaction started',
      category: 'SQL transaction issues',
      recommended: true,
    },
    fixable: null,
    schema: [],
    messages: {
      missing: 'Transaction was not committed / rollbacked',
    },
  },
  create: (context) => {
    const [{ transactionName = 'trx' } = {}] = (context.options || []);
    const fns = [];
    let scope = null;

    function lookupTransactionEndings(node) {
      // console.log('   lookup', loc(node), debugScope(scope));
      // console.log('   same? ', fns[fns.length - 1] === node);
      if (fns[fns.length - 1] === scope.transactionStarted) {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missing',
        });
      }
    }

    function startBranch(node) {
      scope = {
        upper: scope,
        transactionStarted: scope ? scope.transactionStarted : false,
        node,
      };
      // console.log('>> ', loc(node), debugScope(scope));
    }

    function endBranch(node) {
      scope = scope.upper;
      // console.log('<< ', loc(node), debugScope(scope));
    }

    function flagScopeStart(node) {
      scope.transactionStarted = fns[fns.length - 1];
      // console.log('   start', loc(node), debugScope(scope));
    }

    function flagScopeEnd(node) {
      scope.transactionStarted = false;
      // console.log('   end ', loc(node), debugScope(scope));
    }

    function startFunction(node) {
      // console.log("node", node.type);
      fns.push(node);
      startBranch(node);
    }

    function exitFunction(node) {
      lookupTransactionEndings(node);
      fns.pop();
      endBranch(node);
    }

    return {
      // onCodePathStart(codePath, node) {
      //   startBranch(node);
      // },
      // onCodePathEnd(codePath, node) {
      //   endBranch(node);
      // },
      ArrowFunctionExpression: startFunction,
      'ArrowFunctionExpression:exit': exitFunction,
      FunctionDeclaration: startFunction,
      'FunctionDeclaration:exit': exitFunction,
      FunctionExpression: startFunction,
      'FunctionExpression:exit': exitFunction,
      IfStatement: startBranch,
      'IfStatement:exit': endBranch,

      // flag trx expressions
      'CallExpression[callee.object.name="transaction"][callee.property.name="start"]': flagScopeStart,
      [`CallExpression[callee.object.name="${transactionName}"][callee.property.name="commit"]`]: flagScopeEnd,
      [`CallExpression[callee.object.name="${transactionName}"][callee.property.name="rollback"]`]: flagScopeEnd,

      // at any exit, transaction should have been ended already
      ReturnStatement: lookupTransactionEndings,
      // 'FunctionExpression:exit': lookupTransactionEndings,
      // 'ArrowFunctionExpression:exit': lookupTransactionEndings,
    };
  },
};
