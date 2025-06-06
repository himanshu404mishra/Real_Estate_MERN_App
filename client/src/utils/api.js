import axios from "axios"
import dayjs from "dayjs"
import { toast } from "react-toastify"

export const api = axios.create({
    baseURL: "https://real-estate-mern-app-two.vercel.app/api",
})

export const getAllProperties = async () => {
    try {
        const response = await api.get("/residency/allresd",{
            timeout: 10 * 1000,
        })

        if(response.status === 400 || response.status === 500
        ){
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something Went Wrong!")
        throw error
    }
}


export const getProperty = async (id) => {
      try {
        const response = await api.get(`/residency/${id}`,{
            timeout: 10 * 1000,
        })

        if(response.status === 400 || response.status === 500
        ){
            throw response.data
        }
        return response.data
    } catch (error) {
        toast.error("Something Went Wrong!")
        throw error
    }
}

export const createUser = async (email,token) => {
    try {
        await api.post(`/user/register`, {email}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    } catch (error) {
           toast.error("Something went wrong! Plz try again")
           throw error
    }
}

export const bookVisit = async (value,propertyId,email,token) => {
    try {
        await api.post(
            `/user/bookVisit/${propertyId}`,
            {
                email,
                id:propertyId,
                date: dayjs(value).format("DD/MM/YYYY")
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
    } catch (error) {
        toast.error("Something went wrong, try again!")
        throw error
    }
}

export const removeBooking = async (propertyId, email, token) => {
    try {
        await api.post(`/user/removeBooking/${propertyId}`,{
            email,
        },
        {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
    )
    } catch (error) {
        toast.error("Something went wrong, plz try again")
        throw error
    }
}

export const toFav = async (propertyId, email,token)=>{
    try {
        await api.post(`/user/toFav/${propertyId}`,{
            email
        },
    {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    } catch (error) {
        toast.error("Something went wrong, Plz try again!")
        throw error
    }
}


export const getAllFav = async (email,token) =>{
    if(!token) return
    else{

        try {
            const res = await api.post(
                `/user/allFav`,
                {
                    email
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return res.data['favResidenciesID']
        } catch (error) {
            toast.error("Something went wrong, try again!")
            throw error
        }

    }
}

export const getAllBookings = async (email, token) => {
  
  if(!token) return 
  try {
    const res = await api.post(
      `/user/allBookings`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data["bookedVisits"];

    
  } catch (error) {
    toast.error("Something went wrong while fetching bookings");
    throw error
  }
}