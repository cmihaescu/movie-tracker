import React from 'react';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import {  AddIcon, CheckIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { HISTORY, WATCHLIST } from '../connectors/api';

export default function HistoryButton({ movie, status, update }) {
  const [isHistoryActive, setHistoryActive] = React.useState(false)
  const todayDate = new Date();

  const toggleHistory = () => {
    update({
      ...movie,
      watchlist: movie.history === HISTORY.WATCHED ? WATCHLIST.LISTED  : WATCHLIST.REMOVED,
      history: movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
      watchedDate: movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : todayDate.toLocaleDateString() 
    });
  };

  const isWatched = movie.history === HISTORY.WATCHED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isWatched ? 'Remove from already watched list' : todayDate < Date.parse(movie.release_date)? 'Movie not yet released' : 'Add to already watched list';
  const disableStatus = (label === "Movie not yet released") ? "disabled" : ""
  
  return (
    <Tooltip label={label} >
      <Box>
      <IconButton  
            disabled = {disableStatus}
            aria-label={isHistoryActive ? 'Remove from history' : 'Mark as watched'}
            icon={isHistoryActive ? <CheckIcon /> : <AddIcon />}
            colorScheme="teal"
            variant={isHistoryActive ? 'solid' : 'outline'}
            isLoading = {status=== STATUS.PENDING}
            onClick={ toggleHistory }
      />
      </Box>
    </Tooltip>
  );
}
