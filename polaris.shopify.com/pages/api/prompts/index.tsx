import type {NextApiResponse, NextApiRequest} from 'next';

const fs = require('fs');
const path = require('path');
const fastCsv = require('fast-csv');
const distance = require('compute-cosine-distance');
const {Configuration, OpenAIApi} = require('openai');

const dataDir = path.join(process.cwd(), 'public', 'data');
const embeddingsCsvPath = path.resolve(dataDir, './embeddings.csv');
const readData = fs.createReadStream(embeddingsCsvPath);

const configuration = new Configuration({
  // add openai api key to .env file
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const response = await openai.createCompletion({
//   model: 'text-davinci-003',
//   prompt: 'Say this is a test',
//   temperature: 0,
//   max_tokens: 7,
// });

interface CSVRow {
  text: string;
  numberOfTokens: number;
  embeddings: number[];
}

/**
 * Create a context for a question by finding the most similar context from the dataframe
 * @param question
 * @param maxLenght
 * @returns
 */
const createContext = async (question: string, maxLenght = 1800) => {
  const csvRows: CSVRow[] = [];

  await readData
    .pipe(fastCsv.parse())
    .on('data', (row: string[]) => {
      // reuturn if the row is the header of the csv
      if (row[3] === 'embeddings') return;

      const rowData = {
        text: row[1],
        numberOfTokens: Number(row[2]),
        embeddings: JSON.parse(row[3]),
      };

      csvRows.push(rowData);
    })
    .on('end', (rowCount: number) => {
      console.log(`${rowCount} rows parsed!`);
    })
    .on('error', (e: unknown) => console.error(e));

  try {
    const {data: questionEmbedding} = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: question,
    });
    const {embedding} = questionEmbedding.data[0];

    // Get the distances from the embeddings
    const dataframe = csvRows.map((row) => {
      return {
        ...row,
        distance: distance(embedding, row.embeddings),
      };
    });

    // Sort by distance
    dataframe.sort((a, b) => a.distance - b.distance);

    // ...and add the text to the context until the context is too long
    const returns = [];
    let currentLenght = 0;

    for (const row of dataframe) {
      // Add the length of the text to the current length
      currentLenght += row.numberOfTokens + 4;

      // If the context is too long, break
      if (currentLenght > maxLenght) break;

      // Else add it to the text that is being returned
      returns.push(row.text);
    }

    // Return the context
    return '\n\n###\n\n' + returns.join('. ');
  } catch (error) {
    console.error(error);
  }
};

const answerQuestion = async () => {};

const getAnswers = async (query?: string) => {
  if (!query) return [];

  const context = await createContext(query);

  return context;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Is this ever an array?
  const query = Array.isArray(req.query.p)
    ? req.query.p.join(' ')
    : req.query.p;

  const answers = await getAnswers(query);

  return res.status(200).json({data: answers});
}
