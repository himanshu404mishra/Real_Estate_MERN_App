import { Modal, Button } from "@mantine/core";
import {DatePicker} from "@mantine/dates"
import { useContext, useState } from "react";
import '@mantine/dates/styles.css';
import { useMutation } from "react-query";
import userContext from "../../context/userContext"
import { bookVisit } from "../../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModel = ({ opened, close, email, propertyId }) => {

  const [value, setValue] = useState(null)

  const {userDetails: {token}, setUserDetails}=useContext(userContext);

  function handleBookingSuccess(){
    toast.success("You have booked your visit",{
      position:"bottom-right"
    })
    setUserDetails((prev)=>({
      ...prev,
      bookings:[
        ...prev.bookings,
        {
          id:propertyId,
          date:dayjs(value).format("DD/MM/YYYY")
        }
      ]
    }))
  }

  const {mutate, isLoading} = useMutation({
    mutationFn: ()=>bookVisit(value,propertyId,email,token),
    onSuccess: ()=>handleBookingSuccess(),
    onError: ({response})=>toast.error(response.data.message),
    onSettled: close
  })

  return (
    <Modal opened={opened} onClose={close} title="Select your date of visit" centered>
      <div className="flexColCenter" style={{gap:"1rem"}}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
        <Button disabled={!value || isLoading} onClick={()=>mutate()}>
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModel;
