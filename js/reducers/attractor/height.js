const height = (state = 480, action) => (
  action.type === 'CHANGE_HEIGHT' ? action.height : state
);

export default height;
