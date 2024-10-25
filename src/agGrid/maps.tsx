import { onCleanup, onMount } from "solid-js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster"; // Import plugin marker cluster
import "leaflet.markercluster/dist/MarkerCluster.css"; // Marker cluster styles
import "leaflet.markercluster/dist/MarkerCluster.Default.css"; // Default cluster styles
import "leaflet-control-geocoder/dist/Control.Geocoder.css"; // Geocoder styles
import { Geocoder } from "leaflet-control-geocoder"; // Geocoder plugin
import "./maps.css"; // Custom styles for the map
import { genderData } from '../pages/store'; // Import the gender data

// Define the type for marker data
type MarkerData = [L.Marker, string, "provinsi" | "kabupaten" | "kecamatan"];

const MapComponent = () => {
  let mapContainer: HTMLDivElement | undefined;

  onMount(() => {
    // Initialize the map
    const map = L.map(mapContainer!);

    // Set the bounds (bounding box) to cover Indonesia
    const bounds = L.latLngBounds([
      [6.274448, 95.293026], // West (Aceh)
      [-10.173211, 141.021805], // East (Papua)
    ]);

    // Adjust the map to fit the bounds
    map.fitBounds(bounds);

    // Add tile layer using HERE Maps API with API Key and colorful map style
    const apiKey = "OOUYkI525ykl6hPR5p7BhTlhHNSmSaCUGGH0zXX6TrQ"; // Your HERE API key
    L.tileLayer(`https://{s}.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?apiKey=${apiKey}`, {
      attribution: '&copy; <a href="https://legal.here.com/en-gb/terms">HERE</a>',
      subdomains: '1234', // Required for HERE tile server subdomains
      tileSize: 512,
      zoomOffset: -1,
    }).addTo(map);

    // Create marker clusters
    const provinceCluster = L.markerClusterGroup();
    const regencyCluster = L.markerClusterGroup();
    const subDistrictCluster = L.markerClusterGroup();

    // Function to get gender data for a location
    const getGenderData = (location: string, level: 'provinsi' | 'kabupaten' | 'kecamatan') => {
      const data = genderData()[level][location];
      if (data) {
        return `<b>${location}</b><br>Male: ${data.male}<br>Female: ${data.female}`;
      }
      return `<b>${location}</b><br>No data available`;
    };

    // Function to add markers to a cluster
    const addMarkersToCluster = (markers: MarkerData[], cluster: L.MarkerClusterGroup) => {
      markers.forEach(([marker, location, level]) => {
        marker.bindPopup(getGenderData(location, level));
        marker.addTo(cluster);
      });
    };

    // Define sample markers with correct types
    const provinceMarkers: MarkerData[] = [
      [L.marker([-6.917464, 107.619125]), 'Jawa Barat', 'provinsi'],
      [L.marker([-7.250445, 112.768845]), 'Jawa Timur', 'provinsi'],
      [L.marker([-6.2087634, 106.845599]), 'DKI Jakarta', 'provinsi'],
      [L.marker([3.5951956, 98.6722227]), 'Sumatera Utara', 'provinsi'],
      [L.marker([-0.789275, 113.921327]), 'Kalimantan Tengah', 'provinsi'],
      [L.marker([5.550176, 95.319915]), 'Aceh', 'provinsi'],
      [L.marker([-8.670458, 115.212629]), 'Bali', 'provinsi'],
      [L.marker([-3.319437, 114.59075]), 'Kalimantan Selatan', 'provinsi'],
      [L.marker([0.507068, 101.447777]), 'Riau', 'provinsi'],
      [L.marker([-0.861453, 134.064016]), 'Papua Barat', 'provinsi'],
    ];

    const regencyMarkers: MarkerData[] = [
      [L.marker([-6.90389, 107.61861]), 'Bandung', 'kabupaten'],
      [L.marker([-7.25747, 112.75209]), 'Sidoarjo', 'kabupaten'],
      [L.marker([3.273089, 99.044617]), 'Asahan', 'kabupaten'],
      [L.marker([-2.916729, 104.745803]), 'Banyuasin', 'kabupaten'],
      [L.marker([-1.622032, 103.611432]), 'Musi Banyuasin', 'kabupaten'],
      [L.marker([0.141803, 117.4733]), 'Kutai Kartanegara', 'kabupaten'],
      [L.marker([-7.596936, 110.639969]), 'Sleman', 'kabupaten'],
      [L.marker([1.483070, 124.83489]), 'Minahasa', 'kabupaten'],
      [L.marker([-8.438, 119.88]), 'Manggarai', 'kabupaten'],
      [L.marker([-1.02474, 103.52729]), 'Tanjung Jabung Timur', 'kabupaten'],
    ];

    // Add markers to clusters
    addMarkersToCluster(provinceMarkers, provinceCluster);
    addMarkersToCluster(regencyMarkers, regencyCluster);

    // Add clusters to the map
    provinceCluster.addTo(map);
    regencyCluster.addTo(map);
    subDistrictCluster.addTo(map);

    // Layer control to toggle visibility of provinces, regencies, and sub-districts
    L.control.layers(null, {
      "Provinces": provinceCluster,
      "Regencies": regencyCluster,
      "Sub-districts": subDistrictCluster,
    }).addTo(map);

    // Add search control to the map
    const searchControl = new Geocoder({
      position: 'topright',
      placeholder: 'Search for location'
    });

    // Add the search control to the map
    searchControl.addTo(map);

    // Handle search results
    searchControl.on('markgeocode', (e: any) => {
      const { center } = e.geocode;

      // Check if the searched location is within the bounds of any marker
      let foundMarker = false;
      provinceCluster.getLayers().forEach((marker: any) => {
        if (marker.getLatLng().equals(center)) {
          foundMarker = true;
        }
      });
      regencyCluster.getLayers().forEach((marker: any) => {
        if (marker.getLatLng().equals(center)) {
          foundMarker = true;
        }
      });
      subDistrictCluster.getLayers().forEach((marker: any) => {
        if (marker.getLatLng().equals(center)) {
          foundMarker = true;
        }
      });

      // Zoom in if marker is found, otherwise show alert
      if (foundMarker) {
        map.setView(center, 13); // Adjust zoom level as needed
      } else {
        alert("Location not found in any marker.");
      }
    });

    // Clean up on unmount
    onCleanup(() => {
      map.remove();
    });
  });

  return <div ref={mapContainer} class="map-container"></div>;
};

export default MapComponent;
