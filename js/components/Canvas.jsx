import React, { PropTypes } from 'react';

const Canvas = ({
  title,
  id,
  width,
  height,
  onClick,
  onClickArgs,
}) => {
  let titleElement = null;
  if (title !== '') {
    titleElement = <span className="card-title">{title}</span>;
  }
  return (
    <div className="card orange darken-4 white-text">
      <div className="card-content">
      {titleElement}
        <br />
        <canvas id={id} width={width} height={height} onClick={e => onClick(e, onClickArgs)}>
        </canvas>
      </div>
    </div>
  );
};

Canvas.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickArgs: PropTypes.object.isRequired,
};

export default Canvas;
