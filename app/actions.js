export const CREATE_VISIT = 'CREATE_VISIT';
export const UPDATE_VISIT = 'UPDATE_VISIT';
export const REMOVE_VISIT = 'REMOVE_VISIT';

export function createVisit(props) {
  return {
    type: CREATE_VISIT,
    props
  };
};

export function updateVisit(id, props) {
  return {
    type: UPDATE_VISIT,
    props: { ...props, id },
    id
  };
};

export function removeVisit(id) {
  return {
    type: REMOVE_VISIT,
    id
  };
};
