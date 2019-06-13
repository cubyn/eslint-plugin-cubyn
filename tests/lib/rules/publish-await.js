const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/publish-await');

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 8 } });

ruleTester.run('publish-await', rule, {
  valid: [
    // `
    // async function handler({ publish }) {
    //   await publish("topic/parcel.created:v1");
    // }`,
    // `
    // async function handler({ publish }) {
    //   return publish("topic/parcel.created:v1");
    // }`,
    // `
    // async function handler({ publish }) {
    //   Promise.all([publish("topic/parcel.created:v1")]);
    // }`,
    // `
    // async function handler({ publish }) {
    //   const promises = [publish("topic/parcel.created:v1")];
    //   Promise.race(promises);
    // }`,
    // `
    // async function handler({ publish }) {
    //   const promises = [];
    //   promises.push(publish("topic/parcel.created:v1"));
    //   Promise.all(promises);
    // }`,
    `
    async function handler({ publish }) {
      const events = ['topic/parcel.created:v1'];
      await Promise.all(events.map(event => publish(event)));
    }`,
  ],
  invalid: [
    // {
    //   code: `
    //     async function handler({ publish }) {
    //       publish("topic/parcel.created:v1");
    //   }`,
    //   errors: [{ messageId: 'missing', type: 'CallExpression' }],
    // },
    // {
    //   code: `
    //     function handler({ publish }) {
    //       publish("topic/parcel.created:v1").then();
    //   }`,
    //   errors: [{ messageId: 'missing', type: 'CallExpression' }],
    // },
  ],
});
