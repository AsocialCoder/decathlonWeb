const INITIAL_STATE = {
  activityData: [],
};

const activityDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'editActivityData':
      return state = action.payload;
    default:
      return state
  }
};

export default activityDataReducer;
