import type {NextApiResponse, NextApiRequest} from 'next';

const {Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
  // add openai api key to .env file
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: 'text-davinci-003',
  prompt: 'Say this is a test',
  temperature: 0,
  max_tokens: 7,
});

const getAnswers = async (query?: string) => {
  if (!query) return [];

  console.log(query);

  return response;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Is this ever an array?
  const query = Array.isArray(req.query.p)
    ? req.query.p.join(' ')
    : req.query.p;

  const answers = getAnswers(query);

  return res.status(200).json({data: answers});
}
