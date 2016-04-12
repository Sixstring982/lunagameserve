import React, { PropTypes } from 'react';

const Canvas = ({
  title,
  id,
  width,
  height,
  mountCallback,
}) => {
  setTimeout(mountCallback, 1);
  return (
    <div className="card orange darken-4 white-text">
      <div className="card-content">
        <span className="card-title">{title}</span>
        <br />
        <canvas id={id} width={width} height={height}></canvas>
      </div>
    </div>
  );
};

Canvas.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  mountCallback: PropTypes.func.isRequired,
};

export default Canvas;
