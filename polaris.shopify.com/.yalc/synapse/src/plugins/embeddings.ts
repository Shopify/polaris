import type { Processor } from "unified";
import { visit } from "unist-util-visit";
import type { BitNode } from "../interfaces";
import { generateEmbeddings, getTokenCount } from "../openAI";

// This plugin batch generates the embeddings for an entire tree up front, then update each node with its embeddings
// LATER: we probably want to cache the results
export function embeddings(this: Processor) {
  const processor = async (tree: any) => {
    const nodes: BitNode[] = [];

    visit(tree, "BitNode", (node, index) => {
      nodes.push(node);
    });

    const texts = nodes.map((node) => node.data.text);
    const embeddings = await generateEmbeddings(texts);

    console.assert(
      nodes.length === embeddings.length,
      "embeddings length mismatch"
    );

    nodes.forEach((node, index) => {
      node.data.embedding = embeddings[index];
      node.data.tokenCount = getTokenCount(node.data.text);
    });
  };

  // Object.assign(this, { Processor: processor });

  return processor;
}
