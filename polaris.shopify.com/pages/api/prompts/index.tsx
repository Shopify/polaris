import type {NextApiResponse, NextApiRequest} from 'next';
import {createChatCompletion, generateEmbedding, getSimilarBits} from 'synapse';
import colors from '../../../scripts/synapse/bits/polaris-color-tokens.json' assert {type: 'json'};
import alphaCard from '../../../scripts/synapse/bits/alpha-card.md.json' assert {type: 'json'};
import alphaStack from '../../../scripts/synapse/bits/alpha-stack.md.json' assert {type: 'json'};
import bleed from '../../../scripts/synapse/bits/bleed.md.json' assert {type: 'json'};
import box from '../../../scripts/synapse/bits/box.md.json' assert {type: 'json'};
import inline from '../../../scripts/synapse/bits/inline.md.json' assert {type: 'json'};
import columns from '../../../scripts/synapse/bits/columns.md.json' assert {type: 'json'};
import divider from '../../../scripts/synapse/bits/divider.md.json' assert {type: 'json'};
import type {Bit, TemplateArgs, Message} from 'synapse';

const combined = [
  ...alphaCard.bits,
  ...alphaStack.bits,
  ...bleed.bits,
  ...box.bits,
  ...inline.bits,
  ...columns.bits,
  ...divider.bits,
  ...colors.bits,
];

const allContext = {
  version: 1,
  embeddingModel: 'openai.com:text-embedding-ada-002',
  bits: combined,
};

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
  const input = Array.isArray(req.query.p)
    ? req.query.p.join(' ')
    : req.query.p;

  // const input = 'What does the Alpha Stack component do?';

  if (!input) return res.status(400).send('A question must be provided');

  try {
    // const aiResponse = await createContextualChatCompletion(
    //   {input},
    //   messagesTemplate,
    //   [...context.bits],
    // );

    // need to handle if it fails
    // console.log(allContext.bits);
    const embeddedInput = await generateEmbedding(input);
    const similarBits = getSimilarBits(
      embeddedInput,
      [...allContext.bits],
      1500,
    );
    const messages = messagesTemplate({input}, similarBits);
    const completion = await createChatCompletion(messages);

    // let mostSimilar = [];

    // for (let i = 0; i <= 4; i++) {
    //   mostSimilar.push(similarBits[i].slug);
    // }

    return res.send({messages, completion});
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
