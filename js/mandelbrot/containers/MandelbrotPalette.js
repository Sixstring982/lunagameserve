import Palette from '../components/core/Palette.jsx';
import { setPaletteChannel, setPaletteComponent } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  title: 'Palette',
  canvasId: state.mandelbrot.canvasId,
  palette: state.mandelbrot.palette,
  colorCanvasId: state.mandelbrot.paletteColorId,
  waveCanvasId: state.mandelbrot.paletteWaveId,
});

const mapDispatchToProps = (dispatch) => ({
  onChannelChange: (channel) => dispatch(setPaletteChannel(channel)),
  onComponentChange: (c, i, v) => dispatch(setPaletteComponent(c, i, v)),
});

const MandelbrotPalette = connect(
  mapStateToProps,
  mapDispatchToProps
)(Palette);

export default MandelbrotPalette;
