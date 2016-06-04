export const CREATE_VISIT = 'ADD_VISIT';
export const REMOVE_VISIT = 'REMOVE_VISIT';
export const UPDATE_VISIT = 'UPDATE_VISIT';

export function createVisit() {
  return {
    type: CREATE_VISIT
  };
}

export function updateVisit(id, props) {
  return {
    type: UPDATE_VISIT,
    id,
    props
  };
}

export function removeVisit(id) {
  return {
    type: REMOVE_VISIT,
    id
  };
}
