export const CREATE_VISIT = 'ADD_VISIT';
export const REMOVE_VISIT = 'REMOVE_VISIT';
export const UPDATE_VISIT = 'UPDATE_VISIT';
export const UPDATE_NEW_VISIT_ENTRY = 'UPDATE_NEW_VISIT_ENTRY';
export const UPDATE_NEW_VISIT_EXIT  = 'UPDATE_NEW_VISIT_EXIT';

export function createVisit(props) {
  return {
    type: CREATE_VISIT,
    props
  };
};

export function removeVisit(id) {
  return {
    type: REMOVE_VISIT,
    id
  };
};

export function updateNewVisitEntry(entry) {
  return {
    type: UPDATE_NEW_VISIT_ENTRY,
    entry
  }
};

export function updateNewVisitExit(exit) {
  return {
    type: UPDATE_NEW_VISIT_EXIT,
    exit
  }
};
