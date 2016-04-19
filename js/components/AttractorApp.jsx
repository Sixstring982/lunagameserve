import React from 'react';
import AttractorSettings from '../containers/AttractorSettings.jsx';
import AttractorCanvas from '../containers/AttractorCanvas.jsx';
import AttractorPalette from '../containers/AttractorPalette';

const AttractorApp = () => (
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
        <AttractorSettings />
        <AttractorPalette />
      </div>
      <div className="col s8">
        <AttractorCanvas />
      </div>
    </div>
  </div>
);

export default AttractorApp;
