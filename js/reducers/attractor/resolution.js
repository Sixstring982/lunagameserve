const resolution = (state = 0, action) => {
  switch (action.type) {
    case 'SET_RESOLUTION':
      return action.resolution;
    default: return state;
  }
};

export default resolution;
