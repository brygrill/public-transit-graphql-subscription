import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

const subClient = new SubscriptionClient('ws://localhost:3001/subscriptions', {
  reconnect: true,
});

const link = new WebSocketLink(subClient);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
