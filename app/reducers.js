import { CREATE_VISIT,
         REMOVE_VISIT,
         UPDATE_VISIT } from './actions';

let lastVisit = 0;

function newVisit() {
  return {
    entry: undefined,
    exit: undefined,
    id: lastVisit++
  };
}

const INITIAL_STATE = {
  visits: [
    newVisit()
  ],
  errors: {}
};


function overlaps(v1, v2) {
  return (v1.entry <= v2.entry && v1.exit >= v2.entry) ||
         (v2.entry <= v1.entry && v2.exit >= v1.entry);
}

function visits(visits, action) {
  switch(action.type) {
    case UPDATE_VISIT:
      return visits.map(visit => {
        if (visit.id === action.id) {
          return Object.assign({}, visit, action.props);
        }
        return visit;
      });
    case CREATE_VISIT:
      return visits.concat(newVisit());
    case REMOVE_VISIT: {
        let newVisits = visits.filter(visit => {
          return visit.id !== action.id;
        });
        if (!newVisits.length) {
          return [newVisit()];
        }
        return newVisits;
    }
    default:
      return visits;
  }
}

function errors(errors, action, visits) {
  let invalid = {};
  let overlap = {};

  for (let i = 0; i < visits.length; ++i) {
    const v = visits[i];

    if (!v.entry || !v.exit || v.entry >= v.exit) {
      invalid[v.id] = true;
    }
  }

  for (let i = 0; i < visits.length; ++i) {
    const v1 = visits[i];

    if (!invalid[v1.id]) {
      for (let j = i+1; j < visits.length; ++j) {
        const v2 = visits[j];

        if (!invalid[v2.id] && overlaps(v1, v2)) {
          overlap[v1.id] = true;
          overlap[v2.id] = true;
        }
      }
    }
  }

  return Object.assign(invalid, overlap);
}

function schengenApp(state = INITIAL_STATE, action) {
  const newVisits = visits(state.visits, action);
  return {
    visits: newVisits,
    errors: errors(state.errors, action, newVisits)
  };
}

export default schengenApp;
