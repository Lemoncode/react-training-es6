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
    $(this.inputPicker)['colorpicker']({
      color: this.props.color,
      align: 'right'
    });
  }

  componentDidUpdate() {
    // Apply the new color in jQuery colorpicker
    $(this.inputPicker).colorpicker('setValue', this.props.color);

    // Show colorpicker popover if needs to be open
    if (this.props.open) {
      this.inputPicker.focus();
      $(this.inputPicker).colorpicker('show');
    }
  }

  componentWillUnmount() {
    // Destroy jQuery colorpicker
    $(this.inputPicker).colorpicker('destroy');
  }

}

ColorPicker.defaultProps = {
  open: false
};

ColorPicker.propTypes = {
  color: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool,
  onColorPick: React.PropTypes.func.isRequired
};