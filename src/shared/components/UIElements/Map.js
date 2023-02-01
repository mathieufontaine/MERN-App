import React, { useState, useRef, useEffect } from "react";
import "./Map.css";
import { Wrapper } from "@googlemaps/react-wrapper";

const Map = (props) => {
  const mapRef = useRef();
  const [map, setMap] = useState();
  const { center, zoom } = props;

  useEffect(() => {
    if (mapRef.current && !map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: center,
          zoom: zoom,
        })
      );
      new window.google.maps.Marker({ position: center, map: map });
    }
  }, [mapRef, center, zoom, map]);

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
      <div
        ref={mapRef}
        className={`map ${props.className}`}
        style={props.style}
      ></div>
    </Wrapper>
  );
};

export default Map;
