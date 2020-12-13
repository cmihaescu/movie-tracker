import React from 'react';
import { 
  Text,
  Box,
  CircularProgress,
  Center,
  HStack,
  SimpleGrid,
  Container,
  IconButton,
 } from '@chakra-ui/react';
 import {
  useParams,
  useHistory } from 'react-router-dom';
 import { ChevronLeftIcon } from '@chakra-ui/icons';
import { PROFILES_URL } from '../connectors/api';
import { STATUS } from '../utils';
import useFetchEffect from '../hooks/useFetchEffect';

export default function Profile() {
  const history = useHistory();
  const { slug } = useParams();
  const { status, data: profiles, error } = useFetchEffect(`${PROFILES_URL}`);
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
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
      <Text fontSize="2xl" textAlign="center" mt={3}>
        Welcome to your Profile Page {slug}
      </Text>
      </HStack>
      <SimpleGrid minChildWidth={150} spacing={3}>
        {
          (profiles.find(profile => { return profile.userName===slug}))? "":"Profile not found. Enter one of the already existing profiles"}{
          profiles.map(({userName,language, age, country, _id}) => userName===slug? (
            <Box>
            <Text mb="10px" pos="relative">
             Your spoken language is: {language} 
            </Text>
            <Text mb="10px" pos="relative">
              You are {age} years old. 
            </Text>
            <Text mb="10px" pos="relative">
             Homecountry: {country} 
            </Text>
            <Text mb="10px" pos="relative">
             Unique identifier: {_id} 
            </Text>
            </Box>
        ):"")
        }
      </SimpleGrid>
    </Container>
  );
}