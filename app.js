import express from 'express';
import {} from 'dotenv/config';
import routes from './routes/routes.js';
import connectDB from './db/connects.js';
import bodyPraser from 'body-parser';

const app = express();

app.use(express.static('public'));
app.use(bodyPraser.urlencoded({extended: false}));
app.use(bodyPraser.json());
app.use('/', routes);

const PORT = process.env.PORT || 5051;

const init = async () => {
  try {
    await connectDB(process.env.DB);
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  } catch (err) {
    console.log(err);
  }
}

init();
