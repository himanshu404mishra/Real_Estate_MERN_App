import React, { useContext, useEffect, useState } from 'react'
import { AiFillAlert, AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useMutation } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import userContext from '../../context/userContext'
import { checkFavourites, updateFavourites } from '../../utils/common'
import { toFav } from '../../utils/api'
import { factory } from '@mantine/core'

const Heart = ({id: propertyId}) => {
    const [heartColor, setHeartColor] = useState('white')

    const {validateLogin} = useAuthCheck()

    const {user} = useAuth0()
      const {
        userDetails: { token, favourites },
        setUserDetails,
      } = useContext(userContext);

    const {mutate} = useMutation({
        mutationFn:()=>toFav(propertyId, user?.email, token),
        onSuccess: ()=>{
            setUserDetails((prev)=> ({
                ...prev,
                favourites: updateFavourites(propertyId,prev.favourites)
            }))
        }
    })

    function handleLike(){
        if(validateLogin()){

            mutate()
            setHeartColor((prev)=>prev === '#fa3e5f' ? 'white' : '#fa3e5f')
        }
    }


    useEffect(() => {
      setHeartColor(()=>checkFavourites(propertyId, favourites))
    }, [favourites])
    

  return (
    <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
        e.stopPropagation()
        handleLike()
    }} />
  )
}

export default Heart