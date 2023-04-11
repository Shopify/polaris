/**
 * Synapse
 * Currently only OpenAI is supported
 */

export { defineConfig } from "./defineConfig";

// openAI utils
export {
  encodeEmbedding,
  decodeEmbedding,
  getTokenCount,
  compareEmbeddings,
  generateEmbedding,
  generateEmbeddings,
  craftPrompt,
  craftMessages,
  createCompletion,
  createChatCompletion,
  createContextualChatCompletion,
  createContextualCompletion,
  getSimilarBits,
} from "./openAI";

// plugins
export { queryResponseParse } from "./plugins/queryResponseParse";
export { embeddings } from "./plugins/embeddings";
export { graphQLParse } from "./plugins/graphQLParse";
export { synapseStringify } from "./plugins/synapseStringify";

// types
export type {
  Bit,
  BitNode,
  SynapseTree,
  Vector,
  PromptTemplate,
  TemplateArgs,
  Message,
  MessagesTemplate,
  SynapseConfig,
  SynapseOptions,
} from "./interfaces";
