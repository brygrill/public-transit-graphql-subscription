import axios from 'axios';
import pubsub from '../subscriptions';

const url =
  'http://busfinder.redrosetransit.com/InfoPoint/rest/Vehicles/GetAllVehiclesForRoutes?routeIDs=1,2,3,5,6,10,11,12,13,14,15,16,17,18,19,20,21,101,102';

export const fetchRedRose = () => {
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

export const pingRedRose = async () => {
  setInterval(async () => {
    const data = await fetchRedRose();
    console.log(data);
    pubsub.publish('all_vehicles', { all_vehicles: data });
  }, 10000);
};
