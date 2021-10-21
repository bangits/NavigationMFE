import produce from 'immer';
const INITIAL_STATE = {};

export const auth = (state = INITIAL_STATE, action): typeof INITIAL_STATE => {
  return produce(state, () => {
    switch (action.type) {
      default:
        break;
    }
  });
};
