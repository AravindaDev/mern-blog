import express, { response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const withDB = async (oprations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = client.db('blogdb');
    await oprations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error Connecting to DB', error });
  }
};

app.get('/api/articles/:name', async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res);
});

app.get('/hello/:name', (req, res) => {
  res.send(`Hello with parameter:  ${req.params.name}`);
});

app.post('/hello', (req, res) => {
  res.send(`Hello ${req.body.name}`);
});

app.post('/api/articles/:name/add-comment', (req, res) => {
  const { userName, comment } = req.body;
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });
    await db.collection('articles').updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo.comments.concat({ userName, comment }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection('articles')
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.listen(8000, () => console.log('Listenning on port 8000'));
