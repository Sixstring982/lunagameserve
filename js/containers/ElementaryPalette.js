import { setChannel, setComponent } from '../actions/ElementaryActions';
import { connect } from 'react-redux';
import Palette from '../components/Palette.jsx';

const mapStateToProps = (state) => ({
  title: 'Palette',
  canvasId: state.elementary.paletteId,
  selectedComponent: state.elementary.palette.getSelectedChannel(),
  components: state.elementary.palette.getSelectedComponent(),
});

const mapDispatchToProps = (dispatch) => ({
  onChannelChange: (channel) => dispatch(setChannel(channel)),
  onComponentChange: (channel, component, id) =>
    dispatch(setComponent(component, id)),
});

const ElementaryPalette = connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);

export default ElementaryPalette;
