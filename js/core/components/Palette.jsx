import React, { PropTypes } from 'react';
import Palette from '../models/Palette';
import Fab from './Fab.jsx';
import Slider from './Slider.jsx';

const PaletteComponent = ({
  title,
  colorCanvasId,
  waveCanvasId,
  palette,
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
              mainColor={COLORS[palette.getSelectedChannel()]}
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
            {palette.getSelectedComponent().map((c, i) =>
              <Slider
                key={i}
                name={`${NAMES[i]} (${c})`}
                min={0}
                max={MAXIMUMS[i]}
                step={0.01}
                value={c}
                onChange={v => onComponentChange(palette.getSelectedChannel(), i, v) }
              />
            ) }
          </div>
          <div className="col s2">
            <canvas id={waveCanvasId} width={35} height={200}></canvas>
          </div>
          <div className="col s2">
            <canvas id={colorCanvasId} width={35} height={200}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

PaletteComponent.propTypes = {
  title: PropTypes.string.isRequired,
  colorCanvasId: PropTypes.string.isRequired,
  waveCanvasId: PropTypes.string.isRequired,
  palette: PropTypes.instanceOf(Palette),
  onChannelChange: PropTypes.func.isRequired,
  onComponentChange: PropTypes.func.isRequired,
};

export default PaletteComponent;
