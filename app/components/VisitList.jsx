import React, { PropTypes } from 'react';

import Visit from './Visit';

const VisitList = ({ visits, onRemoveClicked }) => {
  return (
    <ul className="visits">
      {visits.map(visit =>
        <Visit
          key={visit.id}
          {...visit}
          onRemoveClicked={_ => onRemoveClicked(visit.id)}/>
      )}
    </ul>
  );
}

VisitList.propTypes = {
  visits: PropTypes.array.isRequired,
  onVisitUpdated: PropTypes.func.isRequired,
};

export default VisitList;
