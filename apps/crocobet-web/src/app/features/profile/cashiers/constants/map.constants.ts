export const GOOGLE_MAPS_API_KEY = 'AIzaSyAvOdnNKOSTU3sCbuh9SF5onvNpZu1dgew';
export const INITIAL_LAT = 42;
export const INITIAL_LNG = 44;
export const COUNTRY_ZOOM = 8;
export const CASHIER_ZOOM = 15;

export const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry',
    stylers: [
      {
        color: '#808080'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'landscape.natural.landcover',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'poi.attraction',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi.government',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi.medical',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76'
      }
    ]
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi.school',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'poi.sports_complex',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#252b33'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#11171e'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c'
      }
    ]
  }
];
