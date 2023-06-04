import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import * as ReactLeaflet from 'react-leaflet';

import styles from './Map.module.scss';

import IconRetinaImage from '/public/leaflet/marker-icon-2x.png';
import IconImage from '/public/leaflet/marker-icon.png';
import ShadowImage from '/public/leaflet/marker-shadow.png';

const { MapContainer } = ReactLeaflet;

// const IconRetinaImage = require('/public/leaflet/marker-icon-2x.png').default;
// const IconImage = require('/public/leaflet/marker-icon.png').default;
// const ShadowImage = require('/public/leaflet/marker-shadow.png').default;


const Map = ({ children, className, width, height, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: IconRetinaImage.src,
        iconUrl: IconImage.src,
        shadowUrl: ShadowImage.src,
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  )
}

export default Map;
