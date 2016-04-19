import React, { PropTypes } from 'react';
import Select from './Select.jsx';
import Slider from './Slider.jsx';
import Button from './Button.jsx';

const SettingsForm = ({
  title,
  sliders,
  selects,
  buttons,
  onSliderChange,
  onSelectChange,
  onButtonClick,
  onClickParams,
}) => (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{title}</span>
        <div className="form">
          {sliders.map((s, i) =>
            <Slider key={s.key} {...s} onChange={(value) => onSliderChange(i, value) } />
          )}
        </div>
        {selects.map(s =>
          <Select key={s.key} {...s} onChange={onSelectChange} />
        )}
        {buttons.map(b =>
          <Button key={b.key} {...b} onClick={() => onButtonClick(b.key, onClickParams)} />
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
  buttons: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onClickParams: PropTypes.object.isRequired,
};

export default SettingsForm;
