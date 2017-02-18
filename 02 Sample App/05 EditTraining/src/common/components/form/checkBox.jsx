import * as React from 'react';

export const CheckBoxComponent = (props) => {
  return (
    <div className={`checkbox ${props.className}`}>
      <label htmlFor={props.name}>
        <input
          id={props.name}
          type="checkbox"
          name={props.name}
          checked={props.value}
          onChange={props.onChange}
        />
        {props.label}
      </label>
    </div>
  );
}

CheckBoxComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.bool.isRequired,
  onChange: React.PropTypes.func.isRequired,
  className: React.PropTypes.string,
}
