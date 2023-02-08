import type {NextApiResponse, NextApiRequest} from 'next';

const fs = require('fs');
const path = require('path');
const fastCsv = require('fast-csv');
const distance = require('compute-cosine-distance');
const {Configuration, OpenAIApi} = require('openai');

const dataDir = path.join(process.cwd(), 'pages', 'data');
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

const createContext = async (question: string) => {
  const csvRows: any[] = [];

  await readData
    .pipe(fastCsv.parse())
    .on('data', (row: any[]) => {
      // reuturn if the row is the header of the csv
      if (row[3] === 'embeddings') return;

      const rowData = {
        text: row[1],
        numberOfTokens: row[2],
        embeddings: JSON.parse(row[3]),
      };
      csvRows.push(rowData);
    })
    .on('end', (rowCount: number) => {
      console.log(`${rowCount} rows parsed!`);
    })
    .on('error', (e: unknown) => console.error(e));

  try {
    const {data: q_embeddings} = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: question,
    });
    const {embedding} = q_embeddings.data[0];

    // Get the distances from the embeddings
    const df = csvRows.map((dfEmbedding) => {
      return {
        ...dfEmbedding,
        distance: distance(embedding, dfEmbedding.embeddings),
      };
    });

    // Sort by distance
    df.sort((a, b) => a.distance - b.distance);
    console.log(df[0].text);

    // ...and add the text to the context until the context is too long
    // returns = []
    // cur_len = 0
    // for i, row in df.sort_values('distances', ascending=True).iterrows():
    //     # Add the length of the text to the current length
    //     cur_len += row['n_tokens'] + 4
    //     # If the context is too long, break
    //     if cur_len > max_len:
    //         break
    //     # Else add it to the text that is being returned
    //     returns.append(row["text"])
    // # Return the context
    // return "\n\n###\n\n".join(returns)
  } catch (error) {
    console.error(error);
  }
};

// const answerQuestion = () => {};

const getAnswers = (query?: string) => {
  if (!query) return [];

  createContext(query);

  return query;
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
