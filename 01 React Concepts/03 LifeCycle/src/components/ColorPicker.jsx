import React from 'react';
import $ from 'jquery';
import 'bootstrap-colorpicker';

export class ColorPicker extends React.Component {

  constructor(props) {
    super(props);

    this.pickColor = this.pickColor.bind(this);
    this.setInputPicker = this.setInputPicker.bind(this);
  }

  render() {
    return (
      <div>
        <div className="form-group">
          <label className="control-label col-sm-5" htmlFor="txtColor">Color</label>
          <div className="col-sm-7">
            <input id="txtColor" type="text" className="form-control readonly" readOnly placeholder="Pick a color"
              ref={this.setInputPicker} onBlur={this.pickColor} />
          </div>
        </div>
      </div>
    );
  }

  setInputPicker(inputPicker) {
    return this.inputPicker = inputPicker;
  }

  pickColor(event) {
    // Send back color to <App />
    this.props.onColorPick(event.currentTarget.value);
  }

  componentDidMount() {
    // Initialize jQuery colorpicker
    // Ref: https://itsjavi.com/bootstrap-colorpicker/
    $(this.inputPicker)['colorpicker']({
      color: this.props.color || false,
      align: 'right'
    });
  }

  componentDidUpdate() {
    // Apply the new color in jQuery colorpicker
    $(this.inputPicker)['colorpicker']('setValue', this.props.color);

    // Remove input value if no color because it won't use fallbackColor/fallbackFormat
    // See https://github.com/itsjavi/bootstrap-colorpicker/issues/207
    // There is actually no way to apply 'false' in setValue method to reset colorpicker.
    if (!this.props.color) {
      this.inputPicker.value = '';
    }

    // Show colorpicker popover if needs to be open
    if (this.props.open) {
      this.inputPicker.focus();
      $(this.inputPicker)['colorpicker']('show');
    }
  }

  componentWillUnmount() {
    // Destroy jQuery colorpicker
    $(this.inputPicker)['colorpicker']('destroy');
  }

}

ColorPicker.propTypes = {
  onColorPick: React.PropTypes.func.isRequired,
  color: React.PropTypes.string,
  open: React.PropTypes.bool
};

ColorPicker.defaultProps = {
  open: false
};