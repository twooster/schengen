import React, { PropTypes } from 'react';

import Link from './Link';
import { formatDate } from '../util';

const Visit = ({ entry, exit, duration, onRemoveClicked }) => {
  return (
    <li>
      Entry: {formatDate(entry)}
      Entry: {formatDate(exit)}
      Duration: {duration}<br/>
      <Link onClick={onRemoveClicked}>Remove</Link>
    </li>
  );
};

Visit.propTypes = {
  entry: PropTypes.instanceOf(Date),
  exit: PropTypes.instanceOf(Date),
  duration: PropTypes.number,
  onRemoveClicked: PropTypes.func.isRequired
}

export default Visit;
