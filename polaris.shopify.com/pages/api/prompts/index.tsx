import type {NextApiResponse, NextApiRequest} from 'next';
import {
  createChatCompletion,
  generateEmbedding,
  getSimilarBits,
} from '@shopify/synapse';
import allBits from '../../../.cache/embeddings/allBits.json' assert {type: 'json'};
import siteJson from '../../../.cache/site.json' assert {type: 'json'};
import type {Bit, TemplateArgs, Message} from '@shopify/synapse';

const messagesTemplate = (args: TemplateArgs, similarBits?: Bit[]) => {
  const context = similarBits?.map((bit) => bit.text).join('\n');

  return [
    {
      role: 'system',
      // content: `Answer the question as accurately and thoroughly as possible using the provided context, and if you don't have the answer, say "I don't know".
      // If you have the answer, always start your answer with a { and end your answer with a }`,
      content: `You are the Polaris design system semantic search agent. Answer the question as accurately and thoroughly as possible using the provided context. When providing code, try to only use the Polaris design system. If you don't have the answer, say "I don't know". If you have the answer, respond using markdown.`,
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
  let input = Array.isArray(req.query.p) ? req.query.p.join(' ') : req.query.p;

  // const input = 'What does the Alpha Stack component do?';

  if (!input) return res.status(400).send('A question must be provided');

  // construct slash commands if exist
  if (input.indexOf('/ui') >= 0) {
    input = input.replace('/ui', '');
    input =
      input +
      `${input[input.length - 1] === '.' ? ' ' : '. '}` + // add a period
      'Do not include any imports, do not wrap the code in a component, and hard code all values';
  }

  console.log(input);

  try {
    // const aiResponse = await createContextualChatCompletion(
    //   {input},
    //   messagesTemplate,
    //   [...context.bits],
    // );

    // need to handle if it fails
    // console.log(allContext.bits);
    const embeddedInput = await generateEmbedding(input);
    // console.log(allBits.bits);
    // throw 'eh';
    const similarBits = getSimilarBits(embeddedInput, allBits.bits, 1500);
    // console.log(similarBits);
    const messages = messagesTemplate({input}, similarBits);
    const completion = await createChatCompletion(messages);

    let mostSimilar = similarBits.slice(0, 4);

    let sources = mostSimilar.map((s) => {
      const siteKey = s.slug.substring(1);
      const siteObj = siteJson[siteKey];
      return {
        slug: s.slug,
        title: siteObj?.frontMatter?.title || s.title,
      };
    });

    let unique = [];

    sources.forEach((s) => {
      let match = false;
      unique.forEach((u) => {
        // console.log(s.slug, u.slug);
        if (u.slug === s.slug) {
          match = true;
        }
      });
      if (!match) {
        unique.push(s);
      }
    });

    return res.send({messages, completion, sources: unique});
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
}
