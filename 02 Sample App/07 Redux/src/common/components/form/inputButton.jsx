import * as React from 'react';

export const InputButtonComponent = (props) => {
  return (
    <div className={`form-group ${props.className}`}>
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <div className="input-group">
        <input
          id={props.name}
          type={props.type}
          className="form-control"
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disabled}
        />
        <div className="input-group-btn">
          <span className={props.buttonClassName} onClick={props.onClick}>
            <i className={props.icon} />
          </span>
        </div>
      </div>
    </div>
  );
};

InputButtonComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired,
  buttonClassName: React.PropTypes.string.isRequired,
  icon: React.PropTypes.string.isRequired,
}
