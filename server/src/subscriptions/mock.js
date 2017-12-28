import { pubsub } from '../subscriptions';

// This is just to mock the data
// Normally publish would be emmited from elsewhere
let count = 1;

const mock = () => {
  setInterval(() => {
    count += 1;
    pubsub.publish('votersOnline', { votersOnline: { count } });
  }, 5000);
};

export { count, mock };
