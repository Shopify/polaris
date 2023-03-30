/**
 * utilities for working with OpenAI
 */

import GPT3TokenizerImport from "gpt3-tokenizer";
import type {
  Vector,
  Bit,
  PromptTemplate,
  TemplateArgs,
  MessagesTemplate,
  Message,
} from "./interfaces";
import { Configuration, OpenAIApi } from "openai";

// have to tweak the import of gpt3-tokenizer lib to make it work in node
const GPT3Tokenizer: typeof GPT3TokenizerImport =
  typeof GPT3TokenizerImport === "function"
    ? GPT3TokenizerImport
    : (GPT3TokenizerImport as any).default;

const DEFAULT_TOKEN_COUNT = 3000;
const MAX_COMPLETION_TOKENS = 600;

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_SECRET_KEY,
  })
);

export function encodeEmbedding(data: Vector) {
  return Buffer.from(new Float32Array(data).buffer).toString("base64");
}

export function decodeEmbedding(data: string) {
  return Array.from(
    new Float32Array(new Uint8Array(Buffer.from(data, "base64")).buffer)
  );
}

export function getTokenCount(text: string) {
  const tokenizer = new GPT3Tokenizer({ type: "gpt3" });
  const encoded: { bpe: number[]; text: string[] } = tokenizer.encode(text);
  return encoded.bpe.length;
}

function dotProduct(vecA: Vector, vecB: Vector) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function magnitude(vec: Vector) {
  let sum = 0;
  for (let i = 0; i < vec.length; i++) {
    sum += vec[i] * vec[i];
  }
  return Math.sqrt(sum);
}

// cosine similarity is the dot products of the two vectors divided by the product of their magnitude
// https://en.wikipedia.org/wiki/Cosine_similarity
function cosineSimilarity(vecA: Vector, vecB: Vector) {
  return dotProduct(vecA, vecB) / (magnitude(vecA) * magnitude(vecB));
}

export function compareEmbeddings(embedding1: Vector, embedding2: Vector) {
  return cosineSimilarity(embedding1, embedding2);
}

// return as many bits as can fit the number of tokens
function getMaxBits(bits: Bit[], maxTokens: number): Bit[] {
  let totalTokens = 0;
  const includedBits: Bit[] = [];
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];
    if (totalTokens + bit.tokenCount > maxTokens) {
      return includedBits;
    }
    totalTokens += bit.tokenCount;
    includedBits.push(bit);
  }
  return includedBits;
}

// given an embedding, find the bits with the most similar embeddings
export function getSimilarBits(
  embedding: Vector,
  bits: Bit[],
  maxTokens: number = DEFAULT_TOKEN_COUNT
): Bit[] {
  const sortedBits = bits
    .map((bit) => {
      return {
        ...bit,
        similarity: compareEmbeddings(embedding, bit.embedding),
      };
    })
    // sort by similarity descending
    .sort((a, b) => b.similarity - a.similarity);

  return getMaxBits(sortedBits, maxTokens);
}

// create a single embedding from the given input
// each input must not exceed 8192 tokens in length
// TODO: check token length
export async function generateEmbedding(input: string) {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: input,
  });

  return response.data.data[0].object as unknown as Vector;
}

// batch create embeddings from the given inputs
export async function generateEmbeddings(inputs: string[]) {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: inputs,
  });

  return response.data.data.map((item) => item.embedding);
}

export async function craftPrompt(
  args: TemplateArgs,
  template: PromptTemplate,
  bits: Bit[]
) {
  // create an embedding for the given input
  const queryEmbedding = await generateEmbedding(args.input);

  // use that embedding to find the most similar other embeddings as context
  const similarBits = getSimilarBits(queryEmbedding, bits, 1500);

  return template(args, similarBits);
}

export async function craftMessages(
  args: TemplateArgs,
  template: MessagesTemplate,
  bits: Bit[]
) {
  // create an embedding for the given input
  const queryEmbedding = await generateEmbedding(args.input);

  // use that embedding to find the most similar other embeddings as context
  const similarBits = getSimilarBits(queryEmbedding, bits, 1500);

  return template(args, similarBits);
}

export async function createCompletion(prompt: string) {
  // TODO: make all this configurable
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0,
    max_tokens: MAX_COMPLETION_TOKENS,
  });
  return response.data.choices[0].text;
}

export async function createChatCompletion(messages: Message[]) {
  // TODO: make all this configurable
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0,
    max_tokens: MAX_COMPLETION_TOKENS,
  });
  return response.data.choices[0].message?.content;
}

// craft dynamic messages with context and send it to OpenAI for completion
export async function createContextualChatCompletion(
  args: TemplateArgs,
  messagesTemplate: MessagesTemplate,
  bits: Bit[]
): Promise<{ messages: Message[]; completion: string | undefined }> {
  const messages = await craftMessages(args, messagesTemplate, bits);
  const completion = await createChatCompletion(messages);
  return { messages, completion };
}

// craft a dynamic prompt with context and send it to OpenAI for completion
export async function createContextualCompletion(
  args: TemplateArgs,
  promptTemplate: PromptTemplate,
  bits: Bit[]
): Promise<{ prompt: string; completion: string | undefined }> {
  const prompt = await craftPrompt(args, promptTemplate, bits);
  const completion = await createCompletion(prompt);
  return { prompt, completion };
}
