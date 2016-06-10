import React, { PropTypes } from 'react';

import Link from './Link';
import { formatDate } from '../util';

const Visit = ({ entry, exit, duration, error, onUpdate, onRemove }) => {
  return (
    <tr style={{ backgroundColor: error ? 'red' : null }}>
      <td>
        <input
          type="date"
          name="entry"
          value={formatDate(entry)}
          onChange={e => { onUpdate({ entry: e.target.valueAsDate }) }}/>
      </td>
      <td>
        <input
          type="date"
          name="exit"
          value={formatDate(exit)}
          onChange={e => { onUpdate({ exit: e.target.valueAsDate }) }}/>
      </td>
      <td>
        {duration}
      </td>
      <td>
        <Link onClick={onRemove}>Remove</Link>
      </td>
    </tr>
  );
};

Visit.propTypes = {
  entry: PropTypes.instanceOf(Date),
  exit: PropTypes.instanceOf(Date),
  error: PropTypes.bool,
  duration: PropTypes.number,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default Visit;
