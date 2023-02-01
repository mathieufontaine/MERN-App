import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "../../data/dummyPlaces";

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
