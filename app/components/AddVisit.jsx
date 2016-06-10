import React, { PropTypes } from 'react';

import { formatDate } from '../util';

const AddVisit = ({ entry, exit, error,
                    onEntryChange, onExitChange, onSubmit }) => {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      if (!error && entry && exit) {
        onSubmit({ entry, exit });
      }
    }}>
      Entry: <input
        type="date"
        name="entry"
        value={formatDate(entry)}
        max={formatDate(exit)}
        onChange={e => { onEntryChange(e.target.valueAsDate) }}/><br/>
      Exit: <input
        type="date"
        name="exit"
        value={formatDate(exit)}
        min={formatDate(entry)}
        onChange={e => { onExitChange(e.target.valueAsDate) }}/><br/>
      { error ? `Error: ${error}` : '' }
      <input type="submit" value="Add entry"/>
    </form>
  );
};

AddVisit.propTypes = {
  entry: PropTypes.instanceOf(Date),
  exit: PropTypes.instanceOf(Date),
  error: PropTypes.string,
  onEntryChange: PropTypes.func.isRequired,
  onExitChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddVisit;
