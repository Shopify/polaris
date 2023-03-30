import { describe, expect, it } from "vitest";
import { unified } from "unified";
import { readSync, writeSync } from "to-vfile";
import path from "path";
import { reporter } from "vfile-reporter";

import { queryResponseParse } from "./queryResponseParse";
import type { SynapseTree } from "../interfaces";

describe("queryResponseParse", () => {
  const file = readSync(
    path.resolve(__dirname, "../fixtures/query_response.txt")
  );
  const tree = unified().use(queryResponseParse).parse(file) as SynapseTree;

  it("parses all the bits in the document", () => {
    expect(tree.children.length).toBe(3);
  });

  it("captures a bit's title", () => {
    expect(tree.children[0].data.title).toBe(
      "Fetch the store name and a single product. The product should include a title, description, images, and the price."
    );
  });

  it("creates a properly escaped, unindented text string", () => {
    // prettier-ignore
    const testStr1 = "Fetch the store name and a single product. The product should include a title, description, images, and the price.\n\n{\nshop {\nname\n}\nproduct(id: \"gid://shopify/Product/$Product\") {\ntitle\ndescription\nimages(first: 1) {\nedges {\nnode {\nurl\n}\n}\n}\nvariants(first: 1) {\nedges {\nnode {\nprice {\namount\ncurrencyCode\n}\n}\n}\n}\n}\n}"

    expect(tree.children[0].data.text).to.equal(testStr1);
  });
});
