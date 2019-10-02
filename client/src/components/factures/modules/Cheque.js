import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';

export class Cheque extends React.Component {
  handleChangeTextArea = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="row-fluid">
        <div className="large-12 columns">
          <form>
            <p className="cornflower-blue">Ordre auquel libeller votre chèque</p>
            <label>Domiciliation de la banque</label>
            <TextareaAutosize
              useCacheForDOMMeasurements
              style={{minHeight: 90}}
              name="description"
              value={this.props.data.domiciliation}
              onChange={this.handleChangeTextArea}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Cheque;
