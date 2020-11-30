import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Badge,
  Tooltip,
  Heading,
  Button
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { getImage, imageFallback } from '../connectors/tmdb';
import { WATCHLIST_URL } from '../connectors/api';
import { STATUS } from '../utils';


export default function Recommendations() {
  const { status, data: movies, error } = useFetchEffect(`${WATCHLIST_URL}`);

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
        <Text>Error fetching watchlist: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function Randomize() {
    return Math.floor(Math.random() * Math.floor(movies.length-1));
  }
  let recommendationsArray = []
  let firstRecommendationIndex = Randomize()
  let secondRecommendationIndex = Randomize() 
  if(secondRecommendationIndex===firstRecommendationIndex){secondRecommendationIndex=Randomize()}
  
  let thirdRecommendationIndex = Randomize()
  if (thirdRecommendationIndex===secondRecommendationIndex || thirdRecommendationIndex===firstRecommendationIndex)
      {thirdRecommendationIndex=Randomize()}
recommendationsArray.push(movies[firstRecommendationIndex],
                                  movies[secondRecommendationIndex],
                                  movies[thirdRecommendationIndex])
console.log("Recommended movies:", recommendationsArray)
  return (
    <Container p={3} maxW="80em" maxH="200em">
      <Heading  textAlign="center" mt={3} p={6}>
     Don't know what to watch? Here are some suggestions:
    </Heading >
      <SimpleGrid minChildWidth={150} spacing={3}>
        {recommendationsArray.map(movie => (
          <Box as={Link} to={`/movies/${movie.id}`} key={movie.id} maxW="300px" noOfLines={2}>
            
            <Tooltip label={movie.title}>
              <Image
                src={getImage(movie.poster_path, 'w300')}
                alt="Poster"
                fallbackSrc={imageFallback}
              />
            </Tooltip>
            <Text pos="relative">
              {movie.title}
              <Badge variant="solid" colorScheme="teal" pos="absolute" top={-6} right={1}>
                {movie.vote_average}/10
              </Badge>
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Button
        onClick = { refreshPage }
        colorScheme="blue" top={6}>Other suggestions</Button>
    </Container>
  
  );
}
