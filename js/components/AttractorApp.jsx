import React from 'react';
import AttractorSettings from './AttractorSettings.jsx';
import AttractorCanvas from './AttractorCanvas.jsx';

const AttractorApp = () => (
  <div className="row">
    <div className="col s4">
      <AttractorSettings />
    </div>
    <div className="col s8">
      <AttractorCanvas />
    </div>
  </div>
);

export default AttractorApp;
