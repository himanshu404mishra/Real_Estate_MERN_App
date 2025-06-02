import React, { useState } from "react";

import { Modal, Button, Container, Stepper, Group } from "@mantine/core";
import AddLocation from "../AddLocation/AddLocation";
import { useAuth0 } from "@auth0/auth0-react";
import UploadImage from "../UploadImage/UploadImage";
export default function AddPropertyModal({ opened, close }) {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const {user} = useAuth0()

  const [propertDetails, setPropertDetails] = useState({
    title:"",
    description:"",
    price:0,
    country:"",
    city:"",
    address:"",
    image:null,
    facilities:{
        bedrooms:0,
        parkings:0,
        bathrooms:0,
    },
    userEmail:user?.email
  })

  return (
    <Modal opened={opened} onClose={close} title="Add Property" size={"90rem"}>
      <Container h={"40rem"} w={"100%"}>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Location" description="Address">
            <AddLocation
                nextStep = {nextStep}
                prevStep={prevStep}
                propertDetails={propertDetails}
                setPropertDetails={setPropertDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Verify email">
            <UploadImage
            nextStep = {nextStep}
                prevStep={prevStep}
                propertDetails={propertDetails}
                setPropertDetails={setPropertDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Get full access">
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
        
      </Container>
    </Modal>
  );
}
