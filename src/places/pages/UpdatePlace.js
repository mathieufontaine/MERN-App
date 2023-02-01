import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DUMMY_PLACES } from "../../data/dummyPlaces";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/useForm";
import Card from "../../shared/components/UIElements/Card";

const UpdatePlace = () => {
  const placeId = useParams().pid;
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (place && placeId) {
      setIsLoading(true);
      setFormData(
        {
          title: {
            value: place.title,
            isValid: true,
          },
          description: {
            value: place.description,
            isValid: true,
          },
          address: {
            value: place.address,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [place, placeId, setFormData]);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  if (isLoading)
    return (
      <div className="center">
        <Card>
          <h2>Loading...</h2>
        </Card>
      </div>
    );

  if (!isLoading && place == null)
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={true}
      />
      <Input
        id="description"
        element="input"
        type="text"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description."
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={true}
      />
      <Input
        id="address"
        element="input"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
        value={formState.inputs.address.value}
        valid={true}
      />
      <Button
        type="submit"
        disabled={!formState.isValid}
        to={`/${place.creator}/places`}
      >
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
