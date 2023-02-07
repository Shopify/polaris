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

export default async function (req, res) {}
