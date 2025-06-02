import {useForm} from "@mantine/form"
import { validateString } from '../../utils/common'
import { Button, Group, Select, TextInput } from '@mantine/core'
import useCountries from "../../hooks/useCountries"
import Map from "../Map/Map"

const AddLocation = ({nextStep,
                propertDetails,
                setPropertDetails}) => {
  const form = useForm({
    initialValues:{
      country: propertDetails?.country,
      city: propertDetails?.city,
      address: propertDetails?.address
    },
    validate:{
      country: (value)=>validateString(value),
      city: (value)=>validateString(value),
      address: (value)=>validateString(value)
    }
  })

  const {getAll} = useCountries()

  const {country,city,address} = form.values

  const handelSubmit = () => {
    const {hasErrors} = form.validate()
    if(!hasErrors){
      setPropertDetails((prev)=>({...prev,city, country,address}))
      nextStep()
    }
  }


  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      handelSubmit()
    }}>
      <div className="flexCenter"
      style={{
        gap:'3rem',
        marginTop:'3rem',
        justifyContent:'space-between',
        flexDirection:'row'
      }}
      >
        
        <div className="flexColStart">
          <Select
            w={'100%'}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {
              ...form.getInputProps("country", {type:'input'})
            }
          />
          <TextInput
            w={'100%'}
            withAsterisk
            label='City'
             {
              ...form.getInputProps("city", {type:'input'})
            }
          />
          <TextInput
            w={'100%'}
            withAsterisk
            label='Address'
             {
              ...form.getInputProps("address", {type:'input'})
            }
          />
        </div>

      <div style={{flex:1}}>
        <Map
        address={address}
        city={city}
        country={country}
        />
      </div>
      </div>
<Group justify="center" mt="xl">
          
          <Button type="submit">Next step</Button>
        </Group>
    </form>
  )
}

export default AddLocation