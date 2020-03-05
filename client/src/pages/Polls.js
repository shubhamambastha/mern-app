import React from 'react';
import Poll from '../components/currPoll';
import ErrorMessage from '../components/ErrorMsg';

const PollPage = ({ match, getPoll, poll }) => {
  const host = window.location.href;
  getPoll(match.params.id);

  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default PollPage;