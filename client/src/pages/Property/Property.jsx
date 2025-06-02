import React, { useContext, useState } from "react";
import "./Property.css";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModel from "../../components/BookingModel/BookingModel";
import { useDisclosure } from "@mantine/hooks";
import userContext from "../../context/userContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { propertyId } = useParams();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(userContext);

  const { data, isLoading, isError } = useQuery(["resd", propertyId], () =>
    getProperty(propertyId)
  );

  const {mutate: cancelBooking, isLoading:cancelling}=useMutation({
    mutationFn:()=>removeBooking(propertyId, user?.email, token),
    onSuccess: ()=>{
      setUserDetails((prev)=>(
        {
          ...prev,
          bookings: prev.bookings.filter((booking)=>booking?.id != propertyId)
        }
      ))
      toast.success("Booking Canceled successfully!", {position:"bottom-right"})
    }
  })

  const { user } = useAuth0();

  const [opened, { open, close }] = useDisclosure(false);
  const { validateLogin } = useAuthCheck();

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching data</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings" style={{ height: "60vh" }}>
          <PuffLoader
            height="80"
            width="80"
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={propertyId}/>
        </div>

        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${data?.price}
              </span>
            </div>

            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities?.parkings} Parkings</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities?.bedrooms} Bedrooms</span>
              </div>
            </div>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <div className="secondaryText">
                {data?.address},{data?.city},{data?.country}
              </div>
            </div>

            {bookings?.map((booking) => booking.id).includes(propertyId) ? (
             <>
             <Button variant="outline" w={"100%"} color="red" onClick={cancelBooking} disabled={cancelling}>
                <span>Cancel Booking</span>
              </Button>
              <span>
                Your visit already booked for date {bookings?.filter(booking=>booking?.id===propertyId)[0].date}
              </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && open();
                }}
              >
                Book Your Visit
              </button>
            )}
            <BookingModel
              opened={opened}
              close={close}
              propertyId={propertyId}
              email={user?.email}
            />
          </div>

          <div className="right">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
