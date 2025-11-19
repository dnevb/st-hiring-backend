const { faker } = require('@faker-js/faker');

exports.seed = async function (knex) {
  // create events and tickets for those events
  // added pre generated rows and batch insert for performance improvement
  const eventsData = new Array(100).fill(null).map(() => ({
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(),
    date: faker.date.future(),
    location: faker.location.city(),
  }));
  await knex('events').insert(eventsData);
  const events = await knex('events').select('id');
  const tickets = events.reduce(
    (tickets, event) =>
      tickets.concat(
        new Array(500).fill(null).map(() => ({
          event_id: event.id,
          status: faker.helpers.arrayElement(['available', 'sold', 'reserved']),
          type: 'general',
          price: faker.number.int(1000),
        })),
      ),
    [],
  );

  await knex.batchInsert('tickets', tickets, 200);
};
