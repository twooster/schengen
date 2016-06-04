import { connect } from 'react-redux';

import { removeVisit, updateVisit } from '../actions';
import VisitList from './VisitList';

function computeDurationFor({ entry, exit }) {
  return 42;
};


const mapStateToProps = (state) => {
  return {
    visits: state.visits.map(visit => {
      return Object.assign({}, visit, {
        duration: computeDurationFor(visit)
      });
    })
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onVisitUpdated: (id, props) => {
      dispatch(updateVisit(id, props));
    },
    onRemoveClicked: (id) => {
      dispatch(removeVisit(id));
    }
  };
};

const VisitListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitList);

export default VisitListContainer;
