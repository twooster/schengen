import { CREATE_VISIT,
         REMOVE_VISIT,
         UPDATE_NEW_VISIT_ENTRY,
         UPDATE_NEW_VISIT_EXIT } from './actions';

const INITIAL_STATE = {
  visits: [],
  addVisit: {
    entry: undefined,
    exit: undefined,
    error: null,
  }
};

let lastVisit = 0;

function newVisit(props) {
  return {
    ...props,
    id: lastVisit++
  };
}

function overlaps(v1, v2) {
  return (v1.entry <= v2.entry && v1.exit >= v2.entry) ||
         (v2.entry <= v1.entry && v2.exit >= v1.entry);
}

function validateAddVisit(props, visits) {
  const { entry, exit } = props;
  props.error = null;

  if (entry && exit) {
    if (entry >= exit) {
      props.error = 'Entry must come before exit';
    } else {
      for (let i = 0; i < visits.length; ++i) {
        if (overlaps(visits[i], props)) {
          props.error = 'Overlaps an existing entry';
          break;
        }
      }
    }
  }

  return props;
}

function addVisit(addVisit, action, visits) {
  switch(action.type) {
    case UPDATE_NEW_VISIT_ENTRY:
      return validateAddVisit({
        ...addVisit,
        entry: action.entry
      }, visits);
    case UPDATE_NEW_VISIT_EXIT:
      return validateAddVisit({
        ...addVisit,
        exit: action.exit
      }, visits);
    case CREATE_VISIT:
      return INITIAL_STATE.addVisit;
    default:
      return addVisit;
  }
}

function visits(visits, action) {
  switch(action.type) {
    case CREATE_VISIT:
      return visits.concat(newVisit(action.props));
    case REMOVE_VISIT:
      return visits.filter(visit => {
        return visit.id != action.id;
      });
    default:
      return visits;
  }
}

export default function schengenApp(state = INITIAL_STATE, action) {
  const v = visits(state.visits, action);
  const a = addVisit(state.addVisit, action, v);
  return { visits: v, addVisit: a };
}
