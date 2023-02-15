// import React, { Component } from 'react'
// import { Map, GoogleApiWrapper , Marker, DirectionsRenderer} from 'google-maps-react';
// const mapStyles = {
//   width: '100%',
//   height: '100%'
// };
// export class MapContainer extends Component {
//     state = {
//         source: null,
//         destination: null,
//         directions: null,
//     }
//     onMapClicked = (mapProps, map, clickEvent) => {
//         const { source, destination } = this.state;
//         if (!source) {
//             this.setState({ source: clickEvent.latLng });
//           } else if (!destination) {
//             this.setState({ destination: clickEvent.latLng });
//             this.getDirections(source, clickEvent.latLng);
//           } else {
//             this.setState({ source: clickEvent.latLng, destination: null, directions: null });
//           }
//         // const lat = clickEvent.latLng.lat();
//         // const lng = clickEvent.latLng.lng();
//         // alert(`Latitude: ${lat}, Longitude: ${lng}`);
//         }
//         getDirections = (origin, destination) => {
//             const { google } = this.props;
//             const directionsService = new google.maps.DirectionsService();
//             const request = {
//               origin,
//               destination,
//               travelMode: google.maps.TravelMode.DRIVING,
//             };
//             directionsService.route(request, (result, status) => {
//               if (status === google.maps.DirectionsStatus.OK) {
//                 this.setState({ directions: result });
//               } else {
//                 console.error(`error fetching directions ${result}`);
//               }
//             });
//           }
//   render() {
//     const { source, destination, directions } = this.state;
//     return (
//         <Map
//             google={this.props.google}
//             zoom={14}
//             style={mapStyles}
//             initialCenter={{ lat: 37.090240, lng: -95.712891 }}
//             onClick={this.onMapClicked}
//         >
//         {source && <Marker position={source} />}
//         {destination && <Marker position={destination} />}
//         {directions && <DirectionsRenderer directions={directions} />}
//         </Map>
//     );
//   }
// }

import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, DirectionsRenderer } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  state = {
    source: null,
    destination: null,
    directions: null,
  }

  onMapClicked = (mapProps, map, clickEvent) => {
    const { source, destination } = this.state;
    if (!source) {
      this.setState({ source: clickEvent.latLng });
    } else if (!destination) {
      this.setState({ destination: clickEvent.latLng });
      this.getDirections(source, clickEvent.latLng);
    } else {
      this.setState({ source: clickEvent.latLng, destination: null, directions: null });
    }
  }

  onSourceChanged = (event) => {
    const { google } = this.props;
    const source = event.target.value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: source }, (results, status) => {
      if (status === 'OK') {
        this.setState({ source: results[0].geometry.location });
        if (this.state.destination) {
          this.getDirections(results[0].geometry.location, this.state.destination);
        }
      } else {
        console.error(`error geocoding source ${source}`);
      }
    });
  }

  onDestinationChanged = (event) => {
    const { google } = this.props;
    const destination = event.target.value;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === 'OK') {
        this.setState({ destination: results[0].geometry.location });
        if (this.state.source) {
          this.getDirections(this.state.source, results[0].geometry.location);
        }
      } else {
        console.error(`error geocoding destination ${destination}`);
      }
    });
  }

  getDirections = (origin, destination) => {
    const { google } = this.props;
    const directionsService = new google.maps.DirectionsService();
    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({ directions: result });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }

  render() {
    const { source, destination, directions } = this.state;
    return (
      <div>
        <div>
          <input type="text" placeholder="Enter source address" onChange={this.onSourceChanged} />
          <input type="text" placeholder="Enter destination address" onChange={this.onDestinationChanged} />
          <button onClick={this.onSearch}>Search</button>
        </div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{ lat: 37.090240, lng: -95.712891 }}
          onClick={this.onMapClicked}
        >
          {source && <Marker position={source} />}
          {destination && <Marker position={destination} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </Map>
      </div>
    );
  }
}
export default GoogleApiWrapper({
    apiKey:'AIzaSyBwyOnGOlU8Gdrc4bxjDOczwr945y3SgSk'
  })(MapContainer);