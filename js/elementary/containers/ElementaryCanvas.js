import { renderToCanvas } from '../actions';
import { connect } from 'react-redux';
import Canvas from '../components/core/Canvas.jsx';

const mapStateToProps = (state) => ({
  title: '',
  id: state.elementary.canvasId,
  width: state.elementary.xCells * state.elementary.cellSize,
  height: state.elementary.yCells * state.elementary.cellSize,
  onClickArgs: { },
  shouldRender: state.elementary.shouldRender,
});

const mapDispatchToProps = (dispatch) => ({
  onClick: () => { },
  triggerRender: () => dispatch(renderToCanvas()),
});

const ElementaryCanvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default ElementaryCanvas;
