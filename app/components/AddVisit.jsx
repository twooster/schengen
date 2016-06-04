import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { createVisit } from '../actions';
import Link from './Link';

const AddVisit = connect()(({ dispatch }) => {
  return <Link onClick={() => {
    dispatch(createVisit())
  }}>Add Visit</Link>
});

export default AddVisit;
