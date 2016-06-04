import React, { PropTypes } from 'react';

import Link from './Link';

function formatDate(d) {
  if (!d) return;

  // yyyy-mm-dd
  // 0123457890
  return d.toISOString().slice(0, 10);
}

const Visit = ({ entry, exit, duration, onRemoveClicked, onVisitUpdated }) => {
  return (
    <li className="visit">
      Entry: <input
        type="date"
        name="entry"
        value={formatDate(entry)}
        max={formatDate(exit)}
        onChange={e => { onVisitUpdated({ entry: e.target.valueAsDate }) }}/><br/>
      Exit: <input
        type="date"
        name="exit"
        value={formatDate(exit)}
        min={formatDate(entry)}
        onChange={e => { onVisitUpdated({ exit: e.target.valueAsDate }) }}/><br/>
      Duration: {duration}<br/>
      <Link onClick={onRemoveClicked}>Remove</Link>
    </li>
  );
};

Visit.propTypes = {
  id: PropTypes.number.isRequired,
  entry: PropTypes.instanceOf(Date),
  exit: PropTypes.instanceOf(Date),
  duration: PropTypes.number
}

export default Visit;
