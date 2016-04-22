import React, { PropTypes } from 'react';

const Slider = ({
  name,
  min,
  max,
  step,
  value,
  onChange,
}) => (
  <p className="range-field">
    <label>{name}</label>
    <input type="range" min={min} max={max}
      step={step} value={value}
      onChange={e => onChange(e.currentTarget.valueAsNumber)}
    />
  </p>
);

Slider.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
