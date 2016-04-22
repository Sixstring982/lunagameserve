import { setRule, setXCells,
         setYCells, setCellSize,
         toggleRandomInit, toggleWrap } from '../actions';
import { connect } from 'react-redux';
import SettingsForm from '../components/core/SettingsForm.jsx';

const RULE_SLIDER_KEY = 0;
const X_CELLS_SLIDER_KEY = 1;
const Y_CELLS_SLIDER_KEY = 2;
const CELL_SIZE_SLIDER_KEY = 3;
const buildSliders = (state) => [
  {
    key: RULE_SLIDER_KEY,
    name: `Rule: (${state.elementary.rule})`,
    min: 0,
    max: 127,
    step: 1,
    value: state.elementary.rule,
  }, {
    key: X_CELLS_SLIDER_KEY,
    name: `Width (${state.elementary.xCells})`,
    min: 3,
    max: 512,
    step: 1,
    value: state.elementary.xCells,
  }, {
    key: Y_CELLS_SLIDER_KEY,
    name: `Height (${state.elementary.yCells})`,
    min: 3,
    max: 512,
    step: 1,
    value: state.elementary.yCells,
  }, {
    key: CELL_SIZE_SLIDER_KEY,
    name: `Cell Size (${state.elementary.cellSize})`,
    min: 1,
    max: 32,
    step: 1,
    value: state.elementary.cellSize,
  },
];

const RANDOM_INIT_CHECKBOX_KEY = 0;
const WRAP_CHECKBOX_KEY = 1;
const buildCheckboxes = (state) => [
  {
    key: RANDOM_INIT_CHECKBOX_KEY,
    label: 'Random Initialization',
    checked: state.elementary.randomInit,
  }, {
    key: WRAP_CHECKBOX_KEY,
    label: 'Wrap',
    checked: state.elementary.wrap,
  },
];

const mapStateToProps = (state) => ({
  title: 'Settings',
  sliders: buildSliders(state),
  selects: [],
  buttons: [],
  checkboxes: buildCheckboxes(state),
  onClickParams: {},
});

const mapDispatchToProps = (dispatch) => ({
  onSliderChange: (id, value) => {
    switch (id) {
      case RULE_SLIDER_KEY: dispatch(setRule(value)); break;
      case X_CELLS_SLIDER_KEY: dispatch(setXCells(value)); break;
      case Y_CELLS_SLIDER_KEY: dispatch(setYCells(value)); break;
      case CELL_SIZE_SLIDER_KEY: dispatch(setCellSize(value)); break;
      default: break;
    }
  },
  onSelectChange: () => { },
  onButtonClick: () => { },
  onCheckboxChange: (id) => {
    switch (id) {
      case RANDOM_INIT_CHECKBOX_KEY: dispatch(toggleRandomInit()); break;
      case WRAP_CHECKBOX_KEY: dispatch(toggleWrap()); break;
      default:
        break;
    }
  },
});

const ElementarySettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm);

export default ElementarySettings;
