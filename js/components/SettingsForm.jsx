import React, { PropTypes } from 'react';
import Slider from './Slider.jsx';

const SettingsForm = ({
  title,
  sliders,
  changeFuncs,
}) => (
  <div className="card blue-grey darken-1">
    <div className="card-content">
      <span className="card-title white-text">{title}</span>
      <div className="form">
        {sliders.map((s, i) =>
          <Slider
            key={s.key}
            name={s.name} min={s.min} max={s.max} step={s.step}
            value={s.value} onChange={changeFuncs[i]}
          />
        )}
      </div>
    </div>
  </div>
);

SettingsForm.propTypes = {
  title: PropTypes.string.isRequired,
  sliders: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  changeFuncs: PropTypes.arrayOf(
    PropTypes.func.isRequired).isRequired,
};

export default SettingsForm;
