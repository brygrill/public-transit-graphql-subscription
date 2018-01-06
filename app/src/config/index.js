import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const initMap = (center, container) => {
  return new Promise((resolve, reject) => {
    try {
      const map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/outdoors-v9',
        center,
        zoom: 12.5,
      });

      // Add Controls
      map.addControl(new mapboxgl.NavigationControl());

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        }),
      );

      resolve(map);
    } catch (error) {
      reject(error);
    }
  });
};

export default initMap;
