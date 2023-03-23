import type {NextApiResponse, NextApiRequest} from 'next';
import {createContextualChatCompletion} from 'synapse';
import context from '../../../scripts/synapse/bits/polaris-color-tokens.json' assert {type: 'json'};
import type {Bit, TemplateArgs, Message} from 'synapse';

const messagesTemplate = (args: TemplateArgs, similarBits?: Bit[]) => {
  const context = similarBits?.map((bit) => bit.text).join('\n');

  return [
    {
      role: 'system',
      content: `Answer the question as accurately and thoroughly as possible using the provided context, and if you don't have the answer, say "I don't know".
      If you have the answer, always start your answer with a { and end your answer with a }`,
    },
    {
      role: 'user',
      content: `
        Context: ${context}
        Question: ${args.input}
      `,
    },
    {
      role: 'assistant',
      content: 'Answer:',
    },
  ] as Message[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Is this ever an array?
  const input = Array.isArray(req.query.p)
    ? req.query.p.join(' ')
    : req.query.p;

  if (!input) return res.status(400).send('A question must be provided');

  try {
    const aiResponse = await createContextualChatCompletion(
      {input},
      messagesTemplate,
      [...context.bits],
    );

    return res.send(aiResponse);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
