import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { createVisit } from '../actions';
import Link from './Link';

const AddVisit = ({ dispatch }) => {
  return <Link onClick={ _ => dispatch(createVisit()) }>Add Visit</Link>;
};

export default connect()(AddVisit);
