import express from 'express';
import mongoose from 'mongoose';
import { testRouter } from './routers';
import logger from './middleware/logger';
import { SERVER_PORT, MONGO_URI, TEST_MONGO_URI } from './config';

const app = express();
const router = express.Router();

mongoose.connect(process.env.NODE_ENV === 'test' ? TEST_MONGO_URI : MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', function() {
    console.log('🗄 Database is connected');
});

app.get('/', (_, res) => {
    res.send('Hello World!');
});

app.use('*', logger);

/* Grabs data from JSON dictionary */
app.use('/api/v1/search', router);

/* Grabs data from MongoDB */
app.use('/api/v1/test', testRouter);

app.use((err, _, res) => {
    res.send(err.message);
});

const server = app.listen(SERVER_PORT, () => {
    console.log(`🟢 Server started on port ${SERVER_PORT}`);
});

server.clearDatabase = () => {
    mongoose.connection.db.dropDatabase();
};

export default server;