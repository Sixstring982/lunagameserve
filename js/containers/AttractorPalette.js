import Palette from '../components/Palette.jsx';
import { setPaletteChannel, setPaletteComponent } from '../actions/AttractorActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  title: 'Palette',
  canvasId: state.palette.canvasId,
  selectedComponent: state.palette.channel,
  components: state.palette.components[state.palette.channel],
});

const mapDispatchToProps = (dispatch) => ({
  onChannelChange: (channel) => dispatch(setPaletteChannel(channel)),
  onComponentChange: (c, i, v) => dispatch(setPaletteComponent(c, i, v)),
});

const AttractorPalette = connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);

export default AttractorPalette;
