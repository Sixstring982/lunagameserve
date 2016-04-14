import { setResolution,
         setWindowX, setWindowY,
         setWindowWidth, setWindowHeight } from '../actions/AttractorActions.js';
import { getResolution, getResolutionCount } from '../resolution';
import { connect } from 'react-redux';
import SettingsForm from '../components/SettingsForm.jsx';

const RESOLUTION_SLIDER_KEY = 0;
const WINDOW_X_SLIDER_KEY = 1;
const WINDOW_Y_SLIDER_KEY = 2;
const WINDOW_WIDTH_SLIDER_KEY = 3;
const WINDOW_HEIGHT_SLIDER_KEY = 4;

const buildSliders = (state) => {
  const { width, height } = getResolution(state.resolution);
  return [
    {
      key: RESOLUTION_SLIDER_KEY,
      name: `Canvas Resolution (${width}x${height})`,
      min: 0,
      max: getResolutionCount() - 1,
      step: 1,
      value: state.resolution,
    }, {
      key: WINDOW_X_SLIDER_KEY,
      name: `Window X (${state.window.x})`,
      min: -20,
      max: 20,
      step: 0.5,
      value: state.window.x,
    }, {
      key: WINDOW_Y_SLIDER_KEY,
      name: `Window Y (${state.window.y})`,
      min: -20,
      max: 20,
      step: 0.5,
      value: state.window.y,
    }, {
      key: WINDOW_WIDTH_SLIDER_KEY,
      name: `Window Width (${state.window.width})`,
      min: 0.5,
      max: 20,
      step: 0.5,
      value: state.window.width,
    }, {
      key: WINDOW_HEIGHT_SLIDER_KEY,
      name: `Window Height (${state.window.height})`,
      min: 0.5,
      max: 20,
      step: 0.5,
      value: state.window.height,
    },
  ];
};

const buildSelects = (_state) => [
  {
    key: 0,
    title: 'Attractor',
    groupName: 'attractorSelect',
    options: [
      {
        id: 0,
        text: 'King\'s Dream',
      },
      {
        id: 1,
        text: 'Gingerbread',
      },
    ],
  },
];

const mapStateToProps = (state) => ({
  title: 'Generation Settings',
  sliders: buildSliders(state),
  selects: buildSelects(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSliderChange: (id, value) => {
    switch (id) {
      case RESOLUTION_SLIDER_KEY: dispatch(setResolution(value)); break;
      case WINDOW_X_SLIDER_KEY: dispatch(setWindowX(value)); break;
      case WINDOW_Y_SLIDER_KEY: dispatch(setWindowY(value)); break;
      case WINDOW_WIDTH_SLIDER_KEY: dispatch(setWindowWidth(value)); break;
      case WINDOW_HEIGHT_SLIDER_KEY: dispatch(setWindowHeight(value)); break;
      default: break;
    }
  },
  onSelectChange: () => { },
});

const AttractorSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);

export default AttractorSettings;
