import { setChannel, setComponent } from '../actions/';
import { connect } from 'react-redux';
import Palette from '../components/core/Palette.jsx';

const mapStateToProps = (state) => ({
  title: 'Palette',
  colorCanvasId: state.elementary.colorPaletteId,
  waveCanvasId: state.elementary.wavePaletteId,
  palette: state.elementary.palette,
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
