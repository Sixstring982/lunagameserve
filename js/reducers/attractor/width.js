const width = (state = 640, action) => (
  action.type === 'CHANGE_WIDTH' ? action.width : state
);

export default width;
