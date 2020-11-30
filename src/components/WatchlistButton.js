import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { WATCHLIST,HISTORY } from '../connectors/api';

export default function WatchlistButton({ movie, status, update }) {
  const todayDate = new Date();
  const toggleWatchlist = () => {
    update({
      ...movie,
      watchlist: movie.watchlist === WATCHLIST.LISTED ? WATCHLIST.REMOVED : WATCHLIST.LISTED,
      history: movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.REMOVED,
      addedToWatchList: movie.watchlist===WATCHLIST.LISTED ?WATCHLIST.REMOVED : todayDate.toLocaleString(), 
    });
  };

  const isListed = movie.watchlist === WATCHLIST.LISTED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isListed ? 'Remove from watchlist' : 'Add to watchlist';
  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={<StarIcon />}
        colorScheme="teal"
        variant={isListed ? 'solid' : 'outline'}
        isLoading={status === STATUS.PENDING}
        onClick={toggleWatchlist}
      />
    </Tooltip>
  );
}
