import React from 'react';

import ErrorMessage from '../components/ErrorMsg';
import Polls from '../components/polls';

const HomePage = props => (
  <div>
    <ErrorMessage />
    <Polls {...props} />
  </div>
);

export default HomePage;