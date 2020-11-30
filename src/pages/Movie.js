import React from 'react';
import DatePicker from 'react-date-picker';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Link,
  ListItem,
  List,
  Container,
  Box,
  HStack,
  Heading,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import useMovie from '../hooks/useMovie';
import { getImage, imageFallback } from '../connectors/tmdb';
import { getYear, STATUS } from '../utils';
import WatchlistButton from '../components/WatchlistButton';
import AddToHistoryButton from '../components/AddToHistoryButton';


export default function Movie() {
  const { movieId } = useParams();
  const history = useHistory();
  const [chosenWatchedDate, setWatchedDateManually] = React.useState(null);
  const { movie, status, error, updateStatus, updateMovie, updateWatchedMovie, updateWatchedStatus } = useMovie(movieId);

  React.useEffect(() => {
    chosenWatchedDate!==null  &&  addDate();
  }, [chosenWatchedDate]);

   const addDate  =  ()   => {
    updateWatchedMovie({
      ...movie,
       watchedDate: chosenWatchedDate.toLocaleDateString()
      })
  }

    

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
        <Text>
          Error fetching movie with ID {movieId}: {JSON.stringify(error)}
        </Text>
      </Container>
    );
  }

 
  return (
    <Container p={3} maxW="80em">
      <HStack mb={3} justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ChevronLeftIcon />}
          variant="outline"
          fontSize={36}
          colorScheme="teal"
          onClick={history.goBack}
        />
        <HStack>
        <WatchlistButton movie={movie} status={updateStatus} update={updateMovie} />
        <AddToHistoryButton movie={movie} status={updateWatchedStatus} update={updateWatchedMovie} />
          
        </HStack>
      </HStack>
      <HStack spacing={3} align="flex-start">
        <Box>
          <Image
            src={getImage(movie.poster_path, 'w300')}
            alt="Poster"
            w="35vw"
            maxW={300}
            fallbackSrc={imageFallback}
          />
        </Box>
        <Box w="100%">
          <HStack justify="space-between">
            <Heading as="h2">{movie.title} </Heading>
            <Text as="span" color="GrayText">{movie.runtime} minutes</Text>
            <Text as="span" color="GrayText">
              {getYear(movie.release_date)}
            </Text>
          </HStack>
          <Box>
            <List spacing={3}>
              <ListItem paddingTop="5px">
                <Text as="span" color="GrayText">Genre: {movie.genres? movie.genres.map(a => a.name + " | "): ""} Rating {movie.vote_average}/10</Text>

              </ListItem>
              <ListItem>
                <Text>{movie.overview}</Text>
                
              </ListItem>
              <ListItem>
                <Text>Catchphrase: {movie.tagline}</Text>
                
              </ListItem>
              <ListItem>
                <Text><Link href={`${movie.homepage}`} isExternal>Link to Movie Homepage</Link> </Text>
                
              </ListItem>
              <ListItem>
                <Text><Link href={`https://www.imdb.com/title//${movie.imdb_id}/`} isExternal>Link to IMDB</Link> </Text>

              </ListItem>
              <ListItem>
                <Text>{movie.watchedDate==="removed" || !movie.watchedDate ? "" : `Watched on ${movie.watchedDate}`}</Text>                
              </ListItem>
              <ListItem>
                <Text paddingBottom="5px" visibility = {movie.watchedDate==="removed" || !movie.watchedDate ? "hidden" : "visible"}> Watched date not correct? Choose correct Date from here:  
                  <DatePicker
                  onChange={setWatchedDateManually}
                  value={chosenWatchedDate}
                  />
                </Text>
              </ListItem>            
            </List>
            </Box>
        </Box>
      </HStack>
    </Container>
  );
}
