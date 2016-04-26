import React, { PropTypes } from 'react';
import Checkbox from './Checkbox.jsx';
import Select from './Select.jsx';
import Slider from './Slider.jsx';
import Button from './Button.jsx';

const SettingsForm = ({
  title,
  sliders,
  selects,
  buttons,
  checkboxes,
  onSliderChange,
  onSelectChange,
  onButtonClick,
  onCheckboxChange,
  onClickParams,
}) => {
  let sliderElement = null;
  if (sliders.length > 0) {
    sliderElement = (
      <div className="card-action">
        <div className="form">
          {sliders.map((s, i) =>
            <Slider key={s.key} {...s} onChange={(value) => onSliderChange(i, value) } />
          ) }
        </div>
      </div>
    );
  }

  let selectsElement = null;
  if (selects.length > 0) {
    selectsElement = (
      <div className="card-action">
        {selects.map(s =>
          <Select key={s.key} {...s} onChange={onSelectChange} />
        ) }
      </div>
    );
  }

  let checkboxElement = null;
  if (checkboxes.length > 0) {
    checkboxElement = (
      <div className="card-action">
        {checkboxes.map(c =>
          <Checkbox key={c.key} {...c} onChange={() => onCheckboxChange(c.key) } />
        ) }
      </div>
    );
  }

  let buttonElement = null;
  if (buttons.length > 0) {
    buttonElement = (
      <div className="card-action">
        {buttons.map(b =>
          <Button key={b.key} {...b} onClick={() => onButtonClick(b.key, onClickParams) } />
        ) }
      </div>
    );
  }
  return (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <span className="card-title">{title}</span>
        {sliderElement}
        {selectsElement}
        {checkboxElement}
        {buttonElement}
      </div>
    </div>
  );
};

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
  checkboxes: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onClickParams: PropTypes.object.isRequired,
};

export default SettingsForm;
