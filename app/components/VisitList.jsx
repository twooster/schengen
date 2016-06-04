import React, { PropTypes } from 'react';

import Visit from './Visit';

const VisitList = ({ visits, onRemoveClicked, onVisitUpdated }) => {
  return (
    <ul className="visits">
      {visits.map(visit =>
        <Visit
          key={visit.id}
          {...visit}
          onVisitUpdated={(props) => onVisitUpdated(visit.id, props)}
          onRemoveClicked={() => onRemoveClicked(visit.id)}/>
      )}
    </ul>
  );
}

VisitList.propTypes = {
  visits: PropTypes.array.isRequired,
  onVisitUpdated: PropTypes.func.isRequired,
  onRemoveClicked: PropTypes.func.isRequired
};

export default VisitList;
