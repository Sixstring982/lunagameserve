import { setCanvasContext } from '../actions/AttractorActions.js';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas.jsx';

const CANVAS_ID = 'attractorCanvas';

const mapStateToProps = (state) => ({
  title: 'Canvas',
  id: CANVAS_ID,
  width: state.width,
  height: state.height,
});

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
});

const AttractorCanvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default AttractorCanvas;
