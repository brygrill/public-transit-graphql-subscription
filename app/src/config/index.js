import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const initMap = (center, container) => {
  return new Promise((resolve, reject) => {
    try {
      const map = new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v9',
        center,
        zoom: 11,
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

      // add test layer


      map.on('click', 'test', e => {
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(e.features[0].properties.id)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'test', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'test', () => {
        map.getCanvas().style.cursor = '';
      });

      resolve(map);
    } catch (error) {
      reject(error);
    }
  });
};

export default initMap;
