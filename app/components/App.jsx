import React from 'react';
import VisitListContainer from '../containers/VisitListContainer';
import AddVisit from '../components/AddVisit';
import Calculations from '../components/Calculations';

const App = () => {
  return (
    <div>
      <VisitListContainer />
      <AddVisit />
      <Calculations />
    </div>
  );
};

export default App;
