/* eslint-disable */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {

    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    return {

        CallExpression: function(node) {
            var callee = node.callee;

            if (callee.type === "MemberExpression" && callee.object.name === "logger" &&
                callee.property.name === "log"
            ) {
                context.report(node, "Don't use logger.log(type, ...); use logger[ type ](...) instead.");
            }
        }

    };
};

module.schema = [];
