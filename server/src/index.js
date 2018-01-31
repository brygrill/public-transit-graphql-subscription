/* eslint-disable no-new */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import schema from './schema/schema.gql';
import resolvers from './resolvers';

const port = process.env.PORT || 3001;
const wsURL =
  process.env.NODE_ENV === 'production'
    ? 'wss://ptfeed-graphql.now.sh/subscriptions'
    : `ws://localhost:${port}/subscriptions`;

// Put together a schema
const myGraphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

// Init app
const app = express();

app.disable('x-powered-by');
app.use(helmet());

// Cors middleware
app.use(cors({ origin: true }));

// log requests to console in dev
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app.get('/health', (req, res) => {
  res.json({ up: true });
});

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema: myGraphQLSchema,
    context: { user: req.user },
  })),
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: wsURL,
  }),
);

// Init http server with subscriptions
const server = createServer(app);

server.listen(port, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: myGraphQLSchema,
    },
    {
      server,
      path: '/subscriptions',
    },
  );
  console.log(`Server with websockets listening on ${port}`);
});
