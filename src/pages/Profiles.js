import React from 'react';
import { 
  Text,
  Box,
  Input,
  Container,NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Checkbox,
  Button,
  Link,
  CircularProgress,
  Center,
  Flex
 } from '@chakra-ui/react';
 import { CountryDropdown } from 'react-country-region-selector';
import useFetchEffect from '../hooks/useFetchEffect';
import { PROFILES_URL } from '../connectors/api';
import { STATUS } from '../utils';



export default function Profiles() {
  const[country, setCountry]=React.useState("")
  const[userName, setUserName]=React.useState("")
  const { status, data: profiles, error } = useFetchEffect(`${PROFILES_URL}`);  
  const handleChange = (event) => setUserName(event.target.value)
  if (status === STATUS.IDLE) {
    return null;
  }
  if (status === STATUS.PENDING) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (status === STATUS.REJECTED) {
    return (
      <Container p={3}>
        <Text>Error fetching user: {JSON.stringify(error)}</Text>
      </Container>
    );
  }   
  return (
    <Container>
      <Text fontSize="2xl" textAlign="center" mt={3}>
        Choose one of the existing users in our database:
        </Text>
        <Box mb="15px">
        {(
          profiles.map(profile =>{return <Text> - {profile=profile.userName}</Text>})
          )}
        </Box>
      <Input placeholder="Type in your Profile name"
      value={userName}
      onChange={handleChange}
       />       
        <Link href={`profile/${userName}`} color="teal.500">
          Go to {userName} username
        </Link>
      <Box w="100%" p={4} color="black">
        <Text fontSize="2xl" mb="20px">Create a new profile: (not yet finished)</Text>
        <Flex flexDirection="column" >
        <Input mb="20px" placeholder="Type in your new Profile name" />
        Select your age:
        <NumberInput mb="20px" defaultValue={18} min={7} max={99}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select mb="20px" placeholder="Choose your language">
          <option value="option1">English</option>
          <option value="option2">German</option>
          <option value="option3">French</option>
          <option value="option3">Spanish</option>
          <option value="option3">Italian</option>
          <option value="option3">Romanian</option>
          <option value="option3">Russian</option>
          <option value="option3">Turkish</option>
          <option value="option3">Swedish</option>
          <option value="option3">Finnish</option>
          <option value="option3">Norvegian</option>
          <option value="option3">Dutch</option>
        </Select>
        <Box mb="20px" color="pink" border="3px">
        Your Country:
        <CountryDropdown 
          value={country}
          onChange={(val) => setCountry(val)} />
        </Box>
          <Checkbox mb="20px" colorScheme="red" >
            Adult Content
          </Checkbox>
          <Button
            marginTop={7}
            colorScheme="teal"
            // isLoading={props.isSubmitting}
            type="submit"
            >
            Save changes
          </Button>          
          </Flex>        
      </Box>
    </Container>
  );
}
