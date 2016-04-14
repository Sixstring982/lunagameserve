import React, { PropTypes } from 'react';

const Canvas = ({
  title,
  id,
  width,
  height,
  onClick,
  onClickArgs,
}) => (
    <div className="card orange darken-4 white-text">
      <div className="card-content">
        <span className="card-title">{title}</span>
        <br />
        <canvas id={id} width={width} height={height} onClick={e => onClick(e, onClickArgs()) }>
        </canvas>
      </div>
    </div>
  );

Canvas.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickArgs: PropTypes.func.isRequired,
};

export default Canvas;
