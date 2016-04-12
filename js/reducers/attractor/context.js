const g = (state = null, action) => (
  action.type === 'SET_CANVAS_CONTEXT' ? action.g : state
);

export default g;
