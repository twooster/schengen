import { connect } from 'react-redux';

import { removeVisit, updateVisit } from '../actions';
import VisitList from '../components/VisitList';

function computeDurationFor({ entry, exit }) {
  return 42;
};

const mapStateToProps = (state) => {
  return {
    visits: state.visits.map(visit => {
      return Object.assign({}, visit, {
        duration: computeDurationFor(visit)
      });
    }),
    errors: state.errors
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (id, props) => {
      dispatch(updateVisit(id, props));
    },
    onRemove: (id) => {
      dispatch(removeVisit(id));
    }
  };
};

const VisitListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitList);

export default VisitListContainer;
