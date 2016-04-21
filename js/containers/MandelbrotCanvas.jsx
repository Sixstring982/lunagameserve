import { zoomWindow } from '../actions/MandelbrotActions.js';
import { getResolution } from '../resolution';
import { connect } from 'react-redux';
import { convertEventCoords } from 'canvas-utils';
import Canvas from '../components/Canvas.jsx';

const mapStateToProps = (state) => {
  const { width, height } = getResolution(state.resolution);
  return {
    title: 'Canvas',
    id: state.mandelbrot.canvasId,
    width,
    height,
    shouldRender: false,
    onClickArgs: {
      window: state.mandelbrot.window,
      resolution: getResolution(state.resolution),
      cfunc: t => state.palette.cfunc(t, state.palette.components),
    },
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClick: (e, state) => {
    const win = state.window;
    const { width, height } = state.resolution;
    const mapToWindow = ({ x, y }) => ({
      x: ((x / width) * win.width) + win.x,
      y: ((y / height) * win.height) + win.y,
    });
    const canvasCoords = convertEventCoords(e, e.target);
    const center = mapToWindow(canvasCoords);
    dispatch(zoomWindow(center, state.cfunc));
  },
  triggerRender: () => { },
});

const MandelbrotCanvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default MandelbrotCanvas;
