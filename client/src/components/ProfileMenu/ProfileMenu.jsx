import { Avatar, Menu } from '@mantine/core'
import React from 'react'

const ProfileMenu = ({user,logout}) => {
  return (
    <Menu>
        <Menu.Target>
            <Avatar src={user?.picture} alt='user image' radius={"xl"}/>
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item>
                Favourites
            </Menu.Item>
            <Menu.Item>
            Bookings
            </Menu.Item>
            <Menu.Item onClick={()=>{
                localStorage.clear()
                logout({ logoutParams: { returnTo: "http://localhost:5173" } })
            }} bg={'#fa3e5f'} color='white'>
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
  )
}

export default ProfileMenu