import { CREATE_VISIT, REMOVE_VISIT, UPDATE_VISIT } from './actions';

const INITIAL_STATE = {
  visits: []
};

let lastVisit = 0;

function newVisit() {
  return {
    entry: undefined,
    exit: undefined,
    id: lastVisit++
  };
}

function visits(visits, action) {
  switch(action.type) {
    case CREATE_VISIT:
      return visits.concat(newVisit());
    case REMOVE_VISIT:
      return visits.filter(visit => {
        return visit.id != action.id;
      });
    case UPDATE_VISIT:
      return visits.map(visit => {
        if (visit.id != action.id) {
          return visit;
        }
        return Object.assign({}, visit, action.props, { id: visit.id });
      });
    default:
      return visits;
  }
}

export default function schengenApp(state = INITIAL_STATE, action) {
  return {
    visits: visits(state.visits, action)
  };
}
