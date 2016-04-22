import React from 'react';
import ElementarySettings from '../containers/ElementarySettings';
import ElementaryCanvas from '../containers/ElementaryCanvas';
import ElementaryPalette from '../containers/ElementaryPalette';

const ElementaryApp = ({

}) => (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h3>Elementary Cellular Automata</h3>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <p>

            The Elementary Cellular Automata is a very basic
            cellular automata which runs in one direction by using
            a rule and looking at the cells above.

          </p>
        </div>
      </div>
      <div className="row">
        <div className="col s4">
          <ElementarySettings />
          <ElementaryPalette />
        </div>
        <div className="col s8">
          <ElementaryCanvas />
        </div>
      </div>
    </div>
  );

ElementaryApp.propTypes = ({

});

export default ElementaryApp;
