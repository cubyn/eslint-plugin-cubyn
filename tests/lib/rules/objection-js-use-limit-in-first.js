const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/objection-js-use-limit-in-first');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('objection-js-use-limit-in-first', rule, {
  valid: [
    `
      class Item extends Model {
        static get tableName() {
          return 'items';
        }

        static get useLimitInFirst() {
          return true;
        }
      }
    `,
    `
      class Item extends Model {
        static get useLimitInFirst() {
          return false;
        }
      }
    `,
    `
      class Item {
        static get useLimitInFirst() {
          return true;
        }
      }
    `,
    `
      class Item extends PublicModel {
        static get useLimitInFirst() {
          return true;
        }
      }
    `,
    `
      class Item extends BaseModel {
        static get useLimitInFirst() {
          return true;
        }
      }
    `,
    `
      class Item extends guid(Model) {
        static get useLimitInFirst() {
          return true;
        }
      }
    `,
    `
      const Model = require('../../../drivers/knex');

      module.exports = class Item extends Model {
        static get tableName() {
          return 'items';
        }

        static get useLimitInFirst() {
          return true;
        }

        async update(status) {
          await this.$query().patch({ status });
        }
      };
    `,
  ],
  invalid: [
    {
      code: 'class Item extends Model {}',
      errors: [{ messageId: 'missing', type: 'ClassDeclaration' }],
    },
    {
      code: 'class Item extends PublicModel {}',
      errors: [{ messageId: 'missing', type: 'ClassDeclaration' }],
    },
    {
      code: 'class Item extends BaseModel {}',
      errors: [{ messageId: 'missing', type: 'ClassDeclaration' }],
    },
    {
      code: 'class Item extends guid(Model) {}',
      errors: [{ messageId: 'missing', type: 'ClassDeclaration' }],
    },
    {
      code:
      `
        class Item extends Model {
          get useLimitInFirst() {
            return true;
          }
        }
      `,
      errors: [{ messageId: 'missing', type: 'ClassDeclaration' }],
    },
    {
      code:
      `
      const Model = require('../../../drivers/knex');

      module.exports = class Item extends Model {
        static get tableName() {
          return 'items';
        }

        async update(status) {
          await this.$query().patch({ status });
        }
      };
      `,
      errors: [{ messageId: 'missing', type: 'ClassExpression' }],
    },
  ],
});
