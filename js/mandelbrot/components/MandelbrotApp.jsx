import React from 'react';
import MandelbrotSettings from '../containers/MandelbrotSettings.jsx';
import MandelbrotCanvas from '../containers/MandelbrotCanvas.jsx';
import MandelbrotPalette from '../containers/MandelbrotPalette';

const MandelbrotApp = () => (
  <div className="container">
    <div className="row">
      <div className="col s12">
        <h3>Mandelbrot</h3>
      </div>
    </div>
    <div className="row">
      <div className="col s12">
        <p>

          The Mandelbrot set is one of the most popular fractals. This
          tool allows zooming into the set by clicking the image, and
          includes a flexible rendering palette. Press the generate
          button to begin.

        </p>
      </div>
    </div>
    <div className="row">
      <div className="col s4">
        <MandelbrotSettings />
        <MandelbrotPalette />
      </div>
      <div className="col s8">
        <MandelbrotCanvas />
      </div>
    </div>
  </div>
);

export default MandelbrotApp;
