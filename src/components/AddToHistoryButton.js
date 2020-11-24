import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import {  AddIcon, CheckIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';

export default function HistoryButton({ movie, status, update }) {
  const [isHistoryActive, setHistoryActive] = React.useState(false)
  const toggleHistory = () => {
    update({
      ...movie,
      history: movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
    });
  };

  const isWatched = movie.history === HISTORY.WATCHED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isWatched ? 'Remove from already watched list' : 'Add to already watched list';
  return (
    <Tooltip label={label}>
      <IconButton
            aria-label={isHistoryActive ? 'Remove from history' : 'Mark as watched'}
            icon={isHistoryActive ? <CheckIcon /> : <AddIcon />}
            colorScheme="teal"
            variant={isHistoryActive ? 'solid' : 'outline'}
            isLoading = {status=== STATUS.PENDING}
            onClick={
              // setHistoryActive(a => !a);
              toggleHistory
          }
      />
    </Tooltip>
  );
}
