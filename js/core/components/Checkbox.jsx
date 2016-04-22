import React, { PropTypes } from 'react';

const Checkbox = ({
  label,
  checked,
  onChange,
}) => (
    <div className="switch">
      <label>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="lever"></span>
        {label}
      </label>
    </div>
  );

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
