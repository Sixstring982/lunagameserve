import React, { PropTypes } from 'react';
import Select from './Select.jsx';
import Slider from './Slider.jsx';

const SettingsForm = ({
  title,
  sliders,
  selects,
  onSliderChange,
  onSelectChange,
}) => (
  <div className="card blue-grey darken-1">
    <div className="card-content">
      <span className="card-title white-text">{title}</span>
      <div className="form">
        {sliders.map((s, i) =>
          <Slider key={s.key} {...s} onChange={(value) => onSliderChange(i, value)} />
        )}
      </div>
      {selects.map(s =>
        <Select key={s.key} {...s} onChange={onSelectChange} />
       )}
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
  selects: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
  }).isRequired).isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default SettingsForm;
