import React, { PropTypes } from 'react';

const Fab = ({
  mainColor,
  mainIcon,
  subButtons,
  onSubButtonClick,
}) => (
    <div
      className="fixed-action-btn horizontal"
      style={{
        position: 'inherit',
        display: 'inline-block',
      }}
    >
      <a className={`btn-floating btn-large ${mainColor}`}>
        <i className="large material-icons">{mainIcon}</i>
      </a>
      <ul>
        {subButtons.map(b =>
          <li key={b.key}>
            <a className={`btn-floating ${b.color}`} onClick={() => onSubButtonClick(b.key)}>
              <i className="material-icons">{b.icon}</i>
            </a>
          </li>
        ) }
      </ul>
    </div>
  );

Fab.propTypes = {
  mainColor: PropTypes.string.isRequired,
  mainIcon: PropTypes.string.isRequired,
  subButtons: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onSubButtonClick: PropTypes.func.isRequired,
};

export default Fab;
