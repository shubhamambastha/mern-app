import React from 'react';
import { Redirect } from 'react-router-dom';

import CreatePoll from '../components/createPoll';
import ErrorMessage from '../components/ErrorMsg';

const CreatePollPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div>
      <ErrorMessage />
      <CreatePoll />
    </div>
  );
};

export default CreatePollPage;