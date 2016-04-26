import { setResolution, renderMandelbrot,
         setIterations, resetWindow,
         toggleGaussianBlur, toggleOriginalLayer,
         togglePointTrapLayer } from '../actions';
import Resolution from '../models/core/Resolution';
import { connect } from 'react-redux';
import SettingsForm from '../components/core/SettingsForm.jsx';

const RESOLUTION_SLIDER_KEY = 0;
const ITERATIONS_SLIDER_KEY = 1;

const GENERATE_BUTTON_KEY = 0;
const RESET_BUTTON_KEY = 1;

const buildSliders = (state) => {
  const { width, height } = Resolution.get(state.resolution);
  return [
    {
      key: RESOLUTION_SLIDER_KEY,
      name: `Canvas Resolution (${width}x${height})`,
      min: 0,
      max: Resolution.count() - 1,
      step: 1,
      value: state.resolution,
    }, {
      key: ITERATIONS_SLIDER_KEY,
      name: `Iterations (${Math.pow(2, state.mandelbrot.iterations)})`,
      min: 1,
      max: 13,
      step: 1,
      value: state.mandelbrot.iterations,
    },
  ];
};

const buildButtons = (_state) => [
  {
    key: GENERATE_BUTTON_KEY,
    text: 'Generate',
  }, {
    key: RESET_BUTTON_KEY,
    text: 'Reset',
  },
];

const GAUSSIAN_BLUR_CHECKBOX_KEY = 0;
const ORIGINAL_LAYER_CHECKBOX_KEY = 1;
const POINT_TRAP_LAYER_CHECKBOX_KEY = 2;
const buildCheckboxes = (state) => [
  {
    key: GAUSSIAN_BLUR_CHECKBOX_KEY,
    label: 'Gaussian Blur',
    checked: state.mandelbrot.gaussianBlur,
  }, {
    key: ORIGINAL_LAYER_CHECKBOX_KEY,
    label: 'Original Mandelbrot',
    checked: state.mandelbrot.originalLayer,
  }, {
    key: POINT_TRAP_LAYER_CHECKBOX_KEY,
    label: 'Point Trap',
    checked: state.mandelbrot.pointTrapLayer,
  },
];

const mapStateToProps = (state) => ({
  title: 'Generation Settings',
  sliders: buildSliders(state),
  selects: [],
  buttons: buildButtons(state),
  checkboxes: buildCheckboxes(state),
  onClickParams: {
    cfunc: (t) => state.palette.cfunc(t, state.palette.components),
  },
});

const mapDispatchToProps = (dispatch) => ({
  onSliderChange: (id, value) => {
    switch (id) {
      case RESOLUTION_SLIDER_KEY: dispatch(setResolution(value)); break;
      case ITERATIONS_SLIDER_KEY: dispatch(setIterations(value)); break;
      default: break;
    }
  },
  onSelectChange: () => { },
  onButtonClick: (id, state) => {
    switch (id) {
      case GENERATE_BUTTON_KEY:
        dispatch(renderMandelbrot(state.cfunc));
        break;
      case RESET_BUTTON_KEY:
        dispatch(resetWindow(state.cfunc));
        break;
      default: break;
    }
  },
  onCheckboxChange: (id) => {
    switch (id) {
      case GAUSSIAN_BLUR_CHECKBOX_KEY: dispatch(toggleGaussianBlur()); break;
      case ORIGINAL_LAYER_CHECKBOX_KEY: dispatch(toggleOriginalLayer()); break;
      case POINT_TRAP_LAYER_CHECKBOX_KEY: dispatch(togglePointTrapLayer()); break;
      default: break;
    }
  },
});

const MandelbrotSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);

export default MandelbrotSettings;
