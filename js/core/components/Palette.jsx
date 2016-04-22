import React, { PropTypes } from 'react';
import Fab from './Fab.jsx';
import Slider from './Slider.jsx';

const Palette = ({
  title,
  canvasId,
  selectedComponent,
  components,
  onChannelChange,
  onComponentChange,
}) => {
  let titleElement = null;
  if (title !== '') {
    titleElement = <span className="card-title">{title}</span>;
  }

  const COLORS = ['red', 'green', 'blue'];
  const NAMES = ['offset', 'amplitude', 'speed', 'phase'];
  const MAXIMUMS = [1, 1, 5, 1];

  return (
    <div className="card blue-grey darken-1">
      <div className="card-content white-text">
        <div className="row">
          <div className="col s3">
            {titleElement}
          </div>
          <div className="col s9">
            <Fab
              mainColor={COLORS[selectedComponent]}
              mainIcon="settings_input_component"
              subButtons={[
                {
                  key: 0,
                  color: COLORS[0],
                  icon: 'settings',
                }, {
                  key: 1,
                  color: COLORS[1],
                  icon: 'settings',
                }, {
                  key: 2,
                  color: COLORS[2],
                  icon: 'settings',
                },
              ]}
              onSubButtonClick={v => onChannelChange(v) }
            />
          </div>
        </div>
        <div className="row">
          <div className="col s8">
            {components.map((c, i) =>
              <Slider
                key={i}
                name={`${NAMES[i]} (${c})`}
                min={0}
                max={MAXIMUMS[i]}
                step={0.01}
                value={c}
                onChange={v => onComponentChange(selectedComponent, i, v) }
              />
            ) }
          </div>
          <div className="col s4">
            <canvas id={canvasId} width="35" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

Palette.propTypes = {
  title: PropTypes.string.isRequired,
  canvasId: PropTypes.string.isRequired,
  selectedComponent: PropTypes.number.isRequired,
  components: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  onChannelChange: PropTypes.func.isRequired,
  onComponentChange: PropTypes.func.isRequired,
};

export default Palette;
