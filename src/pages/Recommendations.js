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
  Button,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useFetchEffect from '../hooks/useFetchEffect';
import { getImage, imageFallback } from '../connectors/tmdb';
import { WATCHLIST_URL } from '../connectors/api';
import { STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import AddToHistoryButton from '../components/AddToHistoryButton';


export default function Recommendations() {
  const { status, data: movies, error } = useFetchEffect(`${WATCHLIST_URL}`);

  const [recomandations, setRecomandations] = React.useState(null)

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
  let indexesArray = movies.slice()
  
//aici imi genereaza un index aleatoriu, care sa nu fie mai mare decat numarul total de filme
  function randomize() {
    return Math.floor(Math.random() * Math.floor(indexesArray.length));
  }

  function reload(){
    window.location.reload(false);
  }

  //aici imi scoate acel index din array pentru a nu putea fi ales acelasi index pentru urmatorul film recomandat
  let recommendationIndex = ()=>{
    let index = randomize()
    recommendationsArray.push(indexesArray[index])
    indexesArray.splice(index, 1)
    return index
  }
// apelez de 3 ori functia pentru a avea un array cu filme recomandate cand intru pe "what to watch"
  let recommendationsArray = []
    recommendationIndex()
    recommendationIndex()
    recommendationIndex()
   
   console.log("recommended movies", recommendationsArray)
//aici e functia care imi recomanda alte 3 filme cand ar fi sa apas pe buton. in consola daca urmaresc, functioneaza cum trebuie, dar nu pot face render
  let recommendedMovies = ()=>{
    recommendationsArray.splice(0,3)
    recommendationIndex()
    recommendationIndex()
    recommendationIndex()
    console.log("recomended movies", recommendationsArray)
    console.log("indexesArray", indexesArray.length)
    console.log("indexesArray", indexesArray)
    setRecomandations(recommendationsArray)
    if(indexesArray.length===0){return console.log(`No more movies on the Watchlist`)}{return recommendationsArray}
  }

  return (
    <Container p={3} maxW="80em" maxH="200em">
      <Heading  textAlign="center" mt={3} p={6}>
     Don't know what to watch? Here are some suggestions:
    </Heading >
      <SimpleGrid minChildWidth={150} spacing={3}>
        {recommendationsArray.map(movie => (
          <Box maxW="300px" noOfLines={2}>
            
            <Tooltip label={movie.title}>
              <Box as={Link} to={`/movies/${movie.id}`} key={movie.id}>                
              <Image 
                src={getImage(movie.poster_path, 'w300')}
                alt="Poster"
                fallbackSrc={imageFallback}
              />
              </Box>            
            </Tooltip>
            <Text pos="relative">
              {movie.title}
              <Badge variant="solid" colorScheme="teal" pos="absolute" top={-6} right={1}>
                {movie.vote_average}/10
              </Badge>
            </Text>
              <HStack>
                <WatchlistButton movie = {movie}  />              
                <AddToHistoryButton movie={movie}  />
              </HStack>
          </Box>
        ))}
      </SimpleGrid>
      <Button
        onClick = { recommendedMovies } //la click e functia care imi intoarce un array cu alte 3 filme recomandate
        colorScheme="blue" top={6}>Other suggestions</Button>
    </Container>
  
  );
}
