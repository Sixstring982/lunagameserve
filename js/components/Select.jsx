import React, { PropTypes } from 'react';

const Select = ({
  title,
  groupName,
  options,
}) => (
  <form>
    <p>{title}</p>
    {options.map((option, i) =>
      <p key={option.id}>
        <input className="with-gap" name={groupName} type ="radio" id={`radio-${groupName}-${i}`} />
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
};

export default Select;
