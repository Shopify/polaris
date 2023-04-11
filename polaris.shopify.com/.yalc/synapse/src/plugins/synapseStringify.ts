// serializes a SynapseTree to JSON
import type { Compiler } from "unified";
import type { SynapseTree, BitNode } from "../interfaces";

function toBit(node: BitNode): any {
  return {
    title: node.data.title,
    text: node.data.text,
    slug: node.data.slug,
    embedding: node.data.embedding || [],
    tokenCount: node.data.tokenCount || 0,
  };
}

export function synapseStringify(this: Compiler) {
  function compiler(tree: SynapseTree) {
    const bits = tree.children.map(toBit);

    const output = {
      version: 1, // LATER: versioning
      embeddingModel: "openai.com:text-embedding-ada-002",
      bits: bits,
    };

    return JSON.stringify(output);
  }

  Object.assign(this, { Compiler: compiler });
}
