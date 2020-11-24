import React from 'react';
import { useParams, useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Input,
  HStack,
  IconButton,
  UnorderedList,
  List,
  ListItem,
  Container,
  Link,
  Progress,
  Text,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import useFetch from '../hooks/useFetchEffect';
import { searchMovie,getImage, imageFallback } from '../connectors/tmdb';
import { getData, getYear, getOverview, STATUS } from '../utils';

export default function Search() {
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);

  const handleSearch = event => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };

  const { status, data, error } = useFetch(searchMovie(terms), !!terms);

  return (
    <Container p={3}>
      <Box as="form" onSubmit={handleSearch} w="100%" d="flex" mb={3}>
        <Input placeholder="Search for a movie..." defaultValue={terms} ref={searchRef} mr={3} />
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
          isLoading={status === STATUS.PENDING}
        />
      </Box>
      {status === STATUS.IDLE && <Text>Type some terms and submit for a quick search</Text>}
      {status === STATUS.PENDING && <Progress size="xs" isIndeterminate />}
      {status === STATUS.REJECTED && (
        <Text>
          Error fetching movies for {terms}: {JSON.stringify(error)}
        </Text>
      )}
      {status === STATUS.RESOLVED && (
        <UnorderedList spacing={3} listStyleType={"none"}>
          {data.results.map(({ id, title, release_date, popularity ,vote_average, vote_count, poster_path, overview}) => (
            <ListItem key={id}>
              <Link as={RouterLink} to={`/movies/${id}`}>
                <HStack spacing={3} align="flex-start">
                  <Box>
                    <Image
                      src={getImage(poster_path, 'w300')}
                      alt="Poster"
                      w="35vw"
                      maxW={200}
                      fallbackSrc={imageFallback}
                    />
                  </Box>
                  <Box>
                    <List spacing={3}>
                      <ListItem>
                        <Text as="span" fontWeight="700">{title} </Text>
                      </ListItem>
                      <ListItem>
                        <Text as="span" color="GrayText">
                          Release date: {getYear(release_date)},
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text as="span" color="GrayText">
                          Popularity: {getData(popularity)},
                        </Text>                        
                      </ListItem>
                      <ListItem>
                        <Text as="span" color="GrayText">
                          Rating: {getData(vote_average)}/10,                      
                        </Text>
                      </ListItem>
                      <ListItem>
                        <Text as="span" color="GrayText">
                          Vote Count: {getData(vote_count)},                  
                        </Text>                        
                      </ListItem>
                      <ListItem>
                        <Text as="span" color="GrayText">
                          Movie Plot: {getOverview(overview)}...                      
                        </Text>              
                      </ListItem>
                    </List>
                  </Box>
                </HStack>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      )}
      {/* @todo: Display a message when no results */}
    </Container>
  );
}
