import { setCanvasContext, renderOnContext } from '../actions/AttractorActions.js';
import { getResolution } from '../resolution';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas.jsx';

const CANVAS_ID = 'attractorCanvas';

const mapStateToProps = (state) => {
  const { width, height } = getResolution(state.resolution);
  return {
    title: 'Canvas',
    id: CANVAS_ID,
    width,
    height,
    onClickArgs: () => ({
      window: state.window,
      width: state.width,
      height: state.height,
    }),
  };
};

const mapDispatchToProps = (dispatch) => ({
  mountCallback: () => {
    const canvas = document.getElementById(CANVAS_ID);
    if (canvas === null) {
      setTimeout(this.mountCallback, 1);
    } else {
      const g = canvas.getContext('2d');
      dispatch(setCanvasContext(g));
    }
  },
  onClick: (_e, state) => {
    const win = state.window;
    const width = state.width;
    const height = state.height;
    /*
    const rect = e.target.getBoundingClientRect();
    const canvasCoords = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    */
    const mapToWindow = (x, y) => ({
      x: ((x / width) * win.width) + win.x,
      y: ((y / height) * win.height) + win.y,
    });
    // const windowCoords = mapToWindow(canvasCoords);
    dispatch(renderOnContext((x, y) => {
      const px = mapToWindow(x, y);
      return {
        r: Math.abs(px.x) * 255,
        g: Math.abs(px.y) * 255,
        b: 0,
      };
    }));
  },
});

const AttractorCanvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default AttractorCanvas;
