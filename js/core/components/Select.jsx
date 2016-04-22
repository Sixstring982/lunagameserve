import React, { PropTypes } from 'react';

const Select = ({
  title,
  groupName,
  options,
  selected,
  onChange,
}) => (
  <form>
    <div className="card-title white-text">{title}</div>
    {options.map((option, i) =>
      <p key={option.id}>
        <input
          className="with-gap" checked={selected === i}
          onChange={onChange}
          name={groupName} type ="radio" id={`radio-${groupName}-${i}`}
        />
        <label htmlFor={`radio-${groupName}-${i}`}>{option.text}</label>
      </p>
     )}
  </form>
);

Select.propTypes = {
  title: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  selected: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Select;
