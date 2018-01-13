import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const devURL = 'ws://localhost:3001/subscriptions';
const url = 'wss://ptfeed-graphql.now.sh/subscriptions';
const subClient = new SubscriptionClient(url, {
  reconnect: true,
});

const link = new WebSocketLink(subClient);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
