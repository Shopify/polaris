import { describe, expect, it, beforeAll } from "vitest";
import { unified } from "unified";
import { synapseStringify } from "./synapseStringify";
import type { SynapseTree } from "../interfaces";

describe("Synapse stringify", async () => {
  let doc: any;

  beforeAll(async () => {
    const ast: SynapseTree = {
      type: "root",
      children: [
        {
          type: "BitNode",
          data: {
            title: "what is your favorite color?",
            text: "what is your favorite color?\n\nblue",
            embedding: [0.1, 0.2, 0.3],
            tokenCount: 11,
          },
        },
      ],
    };

    doc = unified().use(synapseStringify).stringify(ast);
  });

  it("should serialize properly", () => {
    expect(doc).toMatchInlineSnapshot(
      '"{\\"version\\":1,\\"embeddingModel\\":\\"openai.com:text-embedding-ada-002\\",\\"bits\\":[{\\"title\\":\\"what is your favorite color?\\",\\"text\\":\\"what is your favorite color?\\\\n\\\\nblue\\",\\"embedding\\":[0.1,0.2,0.3],\\"tokenCount\\":11}]}"'
    );
  });
});
