import express from 'express';
import { knex } from 'knex';
import dbConfig from './knexfile';
import { createEventDAL } from './dal/events.dal';
import { createTicketDAL } from './dal/tickets.dal';
import { createGetEventsController } from './controllers/get-events';
import { MongoClient } from 'mongodb';
import { createSettingController } from './controllers/settings';
import { createSettingDAL } from './dal/settings.dal';

// initialize dependencies
const Knex = knex(dbConfig.development);
const mongoClient = new MongoClient('mongodb://root:example@localhost:27017');
const mongoDb = mongoClient.db('main');

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);
const settingDAL = createSettingDAL(mongoDb);

const app = express();
app.use(express.json());

app.use('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));
app.use('/settings', createSettingController(settingDAL))

app.use('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

export default app;
export const teardown = async () => {
  await mongoClient.close();
  await Knex.destroy();
};
