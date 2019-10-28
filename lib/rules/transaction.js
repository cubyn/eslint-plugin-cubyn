/**
 *  Limitations: do not detect complex trees like:
 *
 *  const test = async (option) => {
 *    const trx = transaction.start(knex);
 *    try {
 *      if (option === 1) await trx.commit();
 *      else trx.rollback();
 *    } catch (error) {
 *      await trx.rollback();
 *    }
 *    return { ok: true }; <-- missingTransactionEnding here
 *  };
 *
 * Anatomy of a transacting block should look like:
 *
 *  const test = async (option) => {
 *    const trx = transaction.start(knex);
 *    try {
 *      <-- Business code -->
 *      await trx.commit();
 *
 *      return { ok: true };
 *    } catch (error) {
 *      <-- Rollback code -->
 *      await trx.rollback();
 *
 *      throw error;
 *    }
 *  };
 */


function locd(node) {
  return `${node.loc.start.line}:${node.loc.start.column}\t› ${node.loc.end.line}:${node.loc.end.column}`;
}

function log(event, fn) {
  return (node) => {
    // console.log(event.padEnd(25, ' '), locd(node));
    fn && fn(node);
  };
}

function findVariableDeclaration(node) {
  if (node.type === 'VariableDeclarator') {
    return node.id.name;
  }

  return findVariableDeclaration(node.parent);
}

function blockIsTryCaught(block) {
  if (!block) {
    return false;
  }

  return block.isTry || blockIsTryCaught(block.upper);
}

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
      missingTransactionStartAwait: 'missing await on transaction.start()',
      missingTransactionEnding: 'missing {{ name }}.commit or {{ name }}.rollback',
      missingTransactionEndingAwait: 'missing await on {{ name }}.{{ property }}',
      missingTransactionTryCatch: 'transaction.start should be immediately followed by a try/catch block',
    },
  },
  create: (context) => {
    const sourceCode = context.getSourceCode();
    let scope = null;

    /**
     * If current block is transacting + reachable, check that
     * we have ended transaction
     * @param  {Node} node
     * @param  {Location} loc defaults to node.loc.start
     */
    function checkTransactionEnding(node, loc) {
      if (!scope || !scope.block || !scope.block.transaction) return;

      if (scope.codePath.currentSegments.some(s => s.reachable)) {
        context.report({
          node,
          loc: loc || node.loc.start,
          messageId: 'missingTransactionEnding',
          data: { name: scope.block.transaction.name },
        });
      }
    }

    /**
     * Push a block on current tree
     * @param  {Node} node
     */
    function onBlockStart(node) {
      // check that transaction is followed by a try/catch block
      const tokenBefore = sourceCode.getTokenBefore(node, {
        filter: token => token.type !== 'Punctuator',
        includeComments: false,
      });

      const isTry = tokenBefore.type === 'Keyword' && tokenBefore.value === 'try';

      scope.block = {
        upper: scope.block,
        transaction: scope.block ? scope.block.transaction : null,
        hasStartedTransaction: false,
        node,
        isTry,
      };
    }

    /**
     * Pop current block off the tree
     * @param  {Node} node
     */
    function onBlockExit(node) {
      if (scope.block.hasStartedTransaction) {
        checkTransactionEnding(node, node.loc.end);
      }

      scope.block = scope.block.upper;
    }

    /**
     * Flag current block as having initiated a transaction
     * that has to be awaited + ended
     * @param  {Node} node
     */
    function onTransactionStarted(node) {
      scope.block.transaction = {
        // get transaction object name from current variable declaration
        name: findVariableDeclaration(node.parent),
        node,
        func: scope,
      };

      scope.block.hasStartedTransaction = true;

      // transaction.start should be awaited
      if (node.parent.type !== 'AwaitExpression') {
        context.report({
          node,
          loc: node.loc,
          messageId: 'missingTransactionStartAwait',
          data: { name: scope.block.transaction.name },
        });
      }

      // check that transaction is followed by a try/catch block
      const tokenAfter = sourceCode.getTokenAfter(node, {
        filter: token => token.type !== 'Punctuator',
        includeComments: false,
      });

      if (tokenAfter.type !== 'Keyword' || tokenAfter.value !== 'try') {
        context.report({
          node,
          loc: node.loc.start,
          messageId: 'missingTransactionTryCatch',
          data: { name: scope.block.transaction.name },
        });
      }
    }

    function onTransactionEnded(node) {
      // not transacting, this does not concern us
      if (!scope.block.transaction) return;

      const objectName = node.callee.object.name;
      if (objectName !== scope.block.transaction.name) return;

      if (node.parent.type !== 'AwaitExpression') {
        context.report({
          node,
          loc: node.loc,
          messageId: 'missingTransactionEndingAwait',
          data: {
            name: node.callee.object.name,
            property: node.callee.property.name,
          },
        });
      }

      scope.block.transaction = null;
    }

    function onThrow(node) {
      if (scope && scope.block && !blockIsTryCaught(scope.block)) {
        checkTransactionEnding(node);
      }
    }

    return {
      // Starts / exits a function definition
      onCodePathStart(codePath, node) {
        log('onCodePathStart')(node);
        scope = {
          upper: scope,
          node,
          codePath,
          block: null,
        };
      },
      onCodePathEnd(codePath, node) {
        log('onCodePathEnd')(node);
        scope = scope.upper;
      },

      // track blocks as they are the ones holding transactions
      BlockStatement: log('BlockStatement', onBlockStart),
      'BlockStatement:exit': log('BlockStatement:exit', onBlockExit),

      // transaction.start => flag transacting
      'CallExpression[callee.object.name="transaction"][callee.property.name="start"]': log('onTransactionStarted', onTransactionStarted),

      // trx.commit/rollback => unflag transacting + check they're awaited
      'CallExpression[callee.property.name="commit"]': log('commit', onTransactionEnded),
      'CallExpression[callee.property.name="rollback"]': log('rollback', onTransactionEnded),

      // return/throw/assert/exit-functions => check that transaction was ended
      ReturnStatement: log('ReturnStatement', checkTransactionEnding),
      ThrowStatement: log('ThrowStatement', onThrow),
      'CallExpression[callee.name="assert"]': log('Assert', onThrow),
    };
  },
};