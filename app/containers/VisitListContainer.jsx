import { connect } from 'react-redux';

import { removeVisit, updateVisit } from '../actions';
import VisitList from '../components/VisitList';

const mapStateToProps = (state) => {
  return state;
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
