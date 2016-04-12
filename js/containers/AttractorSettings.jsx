import { changeWidth, changeHeight } from '../actions/AttractorActions.js';
import { connect } from 'react-redux';
import SettingsForm from '../components/SettingsForm.jsx';

const WIDTH_SLIDER_KEY = 0;
const HEIGHT_SLIDER_KEY = 1;

const buildSliders = (state) => [
  {
    key: WIDTH_SLIDER_KEY,
    name: 'Canvas Width',
    min: 1,
    max: 1920,
    step: 1,
    value: state.width,
  }, {
    key: HEIGHT_SLIDER_KEY,
    name: 'Canvas Height',
    min: 1,
    max: 1080,
    step: 1,
    value: state.height,
  },
];

const buildChangeFuncs = (dispatch) => {
  const funcs = [];
  funcs[WIDTH_SLIDER_KEY] = (width) => dispatch(changeWidth(width));
  funcs[HEIGHT_SLIDER_KEY] = (height) => dispatch(changeHeight(height));
  return funcs;
};

const mapStateToProps = (state) => ({
  title: 'Generation Settings',
  sliders: buildSliders(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeFuncs: buildChangeFuncs(dispatch),
});

const AttractorSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);

export default AttractorSettings;
