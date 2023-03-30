// @ts-nocheck

import {
  buildClientSchema,
  buildSchema,
  buildASTSchema,
  parse,
  getIntrospectionQuery,
  type IntrospectionQuery,
  type GraphQLSchema,
} from "graphql";
/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[Options?] | void[], string, Root>}
 */

// TODO: pull the introspection query dynamically instead of the schema directly
// ? use parseSchemaIntoAST?

export function graphQLParse(options) {
  const parser = (doc) => {
    const settings = /** @type {Options} */ this.data("settings"); // ?
    // const schema = parse(doc);
    const schema = buildSchema(doc);
    // const schemaAST = buildASTSchema(schema);

    // console.log("schema", schema);
    // console.log("schemaAST", schema.astNode);

    // console.log("-----------schema stuff----------");
    // get all directives
    // schema.getDirectives().forEach((directive) => {
    //   console.log("directive", directive);
    // });

    // get all types
    // for (const [name, type] of Object.entries(schema.getTypeMap())) {
    //   // console.log("type", type);
    //   console.log("name", name, type);
    // }

    const bits = [];
    // return bits;
    return {
      type: "SynapseNode",
      children: bits,
    };
    // return fromMarkdown(
    //   doc,
    //   Object.assign({}, settings, options, {
    //     // Note: these options are not in the readme.
    //     // The goal is for them to be set by plugins on `data` instead of being
    //     // passed by users.
    //     extensions: this.data("micromarkExtensions") || [],
    //     mdastExtensions: this.data("fromMarkdownExtensions") || [],
    //   })
    // );
  };

  Object.assign(this, { Parser: parser });
}
