import { connect } from 'react-redux';

import { createVisit, updateNewVisitEntry, updateNewVisitExit } from '../actions';
import AddVisit from '../components/AddVisit';

const mapStateToProps = ({ addVisit }) => {
  return addVisit;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (props) => {
      dispatch(createVisit(props));
    },
    onEntryChange: (date) => {
      dispatch(updateNewVisitEntry(date));
    },
    onExitChange: (date) => {
      dispatch(updateNewVisitExit(date));
    }
  };
};

const AddVisitContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVisit);

export default AddVisitContainer;
