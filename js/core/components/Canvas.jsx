import React, { PropTypes, Component } from 'react';

class Canvas extends Component {
  componentDidMount() {
    if (this.props.shouldRender) {
      this.props.triggerRender();
    }
  }

  componentDidUpdate() {
    if (this.props.shouldRender) {
      this.props.triggerRender();
    }
  }

  render() {
    let titleElement = null;
    if (this.props.title !== '') {
      titleElement = <span className="card-title">{this.props.title}</span>;
    }
    return (
      <div className="card orange darken-4 white-text">
        <div className="card-content">
          {titleElement}
          <br />
          <canvas
            id={this.props.id}
            width={this.props.width}
            height={this.props.height}
            onClick={e => this.props.onClick(e, this.props.onClickArgs) }
          >
          </canvas>
        </div>
      </div>
    );
  }
}

Canvas.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickArgs: PropTypes.object.isRequired,
  shouldRender: PropTypes.bool.isRequired,
  triggerRender: PropTypes.func.isRequired,
};

export default Canvas;
