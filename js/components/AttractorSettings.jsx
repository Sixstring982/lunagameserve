import { changeXResolution, changeYResolution } from '../actions/AttractorActions.js';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Slider from './Slider.jsx';

const UnmappedAttractorSettings = ({
  xRes,
  onXResChange,
  yRes,
  onYResChange,
}) => (
  <div className="card blue-grey darken-1">
    <div className="card-content">
      <span className="card-title white-text">Generation Settings</span>
      <div className="form">
        <Slider name="X Resolution" min={1} max={10000}
          step={1} value={xRes} onChange={onXResChange}
        />
        <Slider name="Y Resolution" min={1} max={10000}
          step={1} value={yRes} onChange={onYResChange}
        />
      </div>
    </div>
  </div>
);

UnmappedAttractorSettings.propTypes = {
  xRes: PropTypes.number.isRequired,
  onXResChange: PropTypes.func.isRequired,
  yRes: PropTypes.number.isRequired,
  onYResChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  xRes: state.xRes,
  yRes: state.yRes,
});

const mapDispatchToProps = (dispatch) => ({
  onXResChange: (value) => {
    dispatch(changeXResolution(value));
  },
  onYResChange: (value) => {
    dispatch(changeYResolution(value));
  },
});

const AttractorSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnmappedAttractorSettings);

export default AttractorSettings;
