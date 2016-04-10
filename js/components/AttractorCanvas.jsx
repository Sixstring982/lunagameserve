import { attachCanvas } from '../actions/AttractorActions.js';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

class UnmappedAttractorCanvas extends Component {
  componentDidMount() {
    const canvas = this.getDOMNode().getElementById('attractorCanvas');
    this.props.mountCallback(canvas);
  }

  render() {
    return (
      <div className="card orange darken-5">
        <div className="card-content">
          <span className="card-title white-text">Canvas</span>
          <div className="form">
            <canvas id="attractorCanvas" width={this.props.xRes} height={this.props.yRes}></canvas>;
          </div>
        </div>
      </div>
    );
  }
}

/*
const UnmappedAttractorCanvas = ({
  xRes,
  yRes,
}) => (
  <div className="card orange darken-5">
    <div className="card-content">
      <span className="card-title white-text">Canvas</span>
      <div className="form">
        <canvas id="attractorCanvas" width={xRes} height={yRes}></canvas>;
      </div>
    </div>
  </div>
);
*/

UnmappedAttractorCanvas.propTypes = {
  xRes: PropTypes.number.isRequired,
  yRes: PropTypes.number.isRequired,
  mountCallback: PropTypes.func.isRequired,
};


const generateCompleteCanvas = (state) => {
  const { xRes, yRes, canvas } = state;
  if (canvas !== undefined && canvas !== null) {
    const g = canvas.getContext('2d');
    const imageData = g.createImageData(width, height);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const index = (x + y * width) * 4;
        imageData.data[index + 0] = 255; // pixels[x][y][0];
        imageData.data[index + 1] = 255; // pixels[x][y][1];
        imageData.data[index + 2] = 255; // pixels[x][y][2];
        imageData.data[index + 3] = 255;
      }
    }
    g.putImageData(imageData, 0, 0);
  }
};

const mapStateToProps = (state) => {
  return {
    xRes: state.xRes,
    yRes: state.yRes,
  };
};

const mapDispatchToProps = (dispatch) => ({
  mountCallback: (canvas) => {
    dispatch(attachCanvas(canvas));
  },
});

const AttractorCanvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnmappedAttractorCanvas);

export default AttractorCanvas;
