import type { ChatCompletionRequestMessage } from "openai";
import type { Node, Parent, Data } from "unist";
import type { Plugin } from "unified";

export interface Bit {
  title: string;
  text: string;
  embedding: Vector;
  tokenCount: number;
  slug?: string;
}

// a wrapper for Bit that unified can use
export interface BitNode extends Node {
  type: "BitNode";
  data: Data & Bit;
}

export interface SynapseTree extends Parent {
  type: "root";
  children: BitNode[];
}

export type Vector = number[];

export type TemplateArgs = { input: string } & {
  [key: string]: any;
};

export type PromptTemplate = (
  args: TemplateArgs,
  similarBits?: Bit[]
) => string;

export type Message = ChatCompletionRequestMessage;

export type MessagesTemplate = (
  args: TemplateArgs,
  similarBits?: Bit[]
) => Message[];

export type SynapseOptions = {
  name: string;
  source: string[];
  // can override the shared outputDir
  outputDir?: string;
  plugins: (Plugin | [Plugin, {}])[];
};

export type SynapseConfig = {
  outputDir: string;
  synapses: SynapseOptions[];
};
