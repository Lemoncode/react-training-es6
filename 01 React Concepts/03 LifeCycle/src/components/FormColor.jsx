import React from 'react';
import { ColorPicker } from './ColorPicker';
import { Button } from './Button';

const commonColors = {
  Darkgreen: '#347B4F',
  Flesh: '#DBAE73',
  Earth: '#944C11',
  Moon: '#466579',
};

export class FormColor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editingColor: '',
      isColorPickerOpen: false,
      sent: false,
    };

    this.saveColor = this.saveColor.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  render() {
    return (
      <form className="form-horizontal" onSubmit={this.submitForm}>
        <div className="row">
          <div className="col-sm-8">
            <div className="form-group">
              <ColorPicker open={this.state.isColorPickerOpen} color={this.state.editingColor} onColorPick={this.saveColor} />
            </div>
            <div className="form-group">
              <label className="control-label col-sm-5" htmlFor="txtSkin">Common colors</label>
              <div className="col-sm-7">
                <Button color={commonColors.Darkgreen} onClick={this.onCommonColorPick(commonColors.Darkgreen)}>Darkgreen</Button>
                <Button color={commonColors.Flesh} onClick={this.onCommonColorPick(commonColors.Flesh)}>Flesh</Button>
                <Button color={commonColors.Earth} onClick={this.onCommonColorPick(commonColors.Earth)}>Earth</Button>
                <Button color={commonColors.Moon} onClick={this.onCommonColorPick(commonColors.Moon)}>Moon</Button>
                <span className="help-block">Pick one by clicking on it</span>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-4 col-sm-offset-5">
                <button type="submit" className="btn btn-success btn-block"
                  disabled={this.state.editingColor.length < 1}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  submitForm(event) {
    event.preventDefault();
    event.currentTarget.reset();
    this.props.onSubmit(this.state.editingColor);
    this.setState({ editingColor: '' });
  }

  onCommonColorPick(editingColor) {
    // Create a new function based on color parameter to set it in the state
    return (event) => {
      event.preventDefault();
      const isColorPickerOpen = true;
      this.setState({ editingColor, isColorPickerOpen });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Do not trigger render if colors are the same
    return this.state.editingColor !== nextState.editingColor;
  }

  saveColor(editingColor) {
    const isColorPickerOpen = false;
    this.setState({ editingColor, isColorPickerOpen });
  }
}

FormColor.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};