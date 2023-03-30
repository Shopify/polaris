// test the embeddings transformer
import { describe, expect, it, beforeEach, vi } from "vitest";
import path from "path";
import { unified } from "unified";
import { readSync } from "to-vfile";
import { embeddings } from "./embeddings";
import { queryResponseParse } from "./queryResponseParse";
import type { SynapseTree } from "../interfaces";
import { generateEmbeddings, compareEmbeddings } from "../openAI";
import test_embeddings from "../fixtures/test_embeddings.json";

// mock openai's network calls
vi.mock("openai", async (importOriginal) => {
  const mod = await importOriginal();
  return {
    // @ts-ignore
    ...mod,
    OpenAIApi: class OpenAIApi {
      constructor() {

      }

      createEmbedding() {
        return {
          data: {
            data: test_embeddings,
          },
        };
      }
    },
  };
});

describe("Embeddings transformer", async () => {
  let treeBefore: SynapseTree; // without the transforms applied
  let treeAfter: SynapseTree;

  const file = readSync(
    path.resolve(__dirname, "../fixtures/query_response.txt")
  );

  beforeEach(async () => {
    const processor = unified().use(queryResponseParse).use(embeddings);
    // treeBefore = await processor.parse(file) as SynapseTree;
    treeBefore = await processor.parse(file);
    treeAfter = await processor.run(processor.parse(file));
  });

  it("should process each node's text field into embeddings", async () => {
    const generatedEmbeddings = treeAfter.children.map(
      (node) => node.data.embedding
    );
    expect(generatedEmbeddings).toHaveLength(treeAfter.children.length);

    generatedEmbeddings.forEach((embedding) => {
      expect(embedding).toBeDefined();
      expect(embedding).toBeInstanceOf(Array);
    });
  });

  it("should create accurate embeddings", async () => {
    const texts = treeBefore.children.map((node) => node.data.text);
    const testEmbeddings = await generateEmbeddings(texts);
    const generatedEmbeddings = treeAfter.children.map(
      (node) => node.data.embedding
    );

    testEmbeddings.forEach((testEmbedding, index) => {
      const similarity = compareEmbeddings(
        testEmbedding,
        generatedEmbeddings[index] || []
      );
      // identical or very close
      expect(similarity).toBeGreaterThan(0.9999);
    });
  });

  it("should assign token counts", () => {
    treeAfter.children.forEach((node) => {
      expect(node.data.tokenCount).toBeDefined();
      expect(node.data.tokenCount).toBeGreaterThan(0);
    });
  });
});
