// HERE: update to new unified syntax

import { describe, expect, it } from "vitest";
import { unified } from "unified";
import { readSync, writeSync } from "to-vfile";
import path from "path";
import { reporter } from "vfile-reporter";
import { graphQLParse } from "./graphQLParse";

import type { SynapseTree } from "../interfaces";

describe("graphQLParse", () => {
  const file = readSync(path.resolve(__dirname, "../fixtures/schema.graphql"));
  // const tree = unified().use(graphQLParse).parse(file) as SynapseTree;

  it("works", () => {
    // TODO: implement
    expect(true).toBe(true);
  });
});
