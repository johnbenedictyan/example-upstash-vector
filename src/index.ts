import { Index } from '@upstash/vector';
import express from 'express';

require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const index = new Index({
    url: process.env.UPSTASH_VECTOR_REST_URL,
    token: process.env.UPSTASH_VECTOR_REST_TOKEN,
  });
  const results = await index.query({
    data: 'Enter data as string',
    topK: 1,
  });

  console.log(results);

  const upsertResult = await index.upsert({
    id: 'a',
    data: 'Qwe data as string',
  });
  console.log(upsertResult);

  res.json('Welcome');
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`),
);
