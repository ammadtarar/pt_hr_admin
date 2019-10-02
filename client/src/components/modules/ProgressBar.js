import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 53
    };
  }

  render() {
    var progress = {
      width: this.state.progress + "%"
    }

    return (
      <div className="progress-bars">

      </div>
    )
  }
}

export default ProgressBar;
