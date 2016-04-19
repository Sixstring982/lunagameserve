import React, { PropTypes } from 'react';

const Button = ({
  text,
  onClick,
}) => (
  <a className="waves-effect waves-light btn white-text" onClick={onClick}>{text}</a>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
