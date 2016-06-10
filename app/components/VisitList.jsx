import React, { PropTypes } from 'react';

import Visit from './Visit';

const VisitList = ({ visits, errors, onRemove, onUpdate }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>Entry</th>
          <th>Exit</th>
          <th>Duration</th>
          <th>Remove</th>
        </tr>
        {visits.map(visit =>
          <Visit
            key={visit.id}
            {...visit}
            error={ Boolean(errors[visit.id]) }
            onUpdate={props => onUpdate(visit.id, props)}
            onRemove={_ => onRemove(visit.id)}/>
        )}
      </tbody>
    </table>
  );
}

VisitList.propTypes = {
  visits: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default VisitList;
