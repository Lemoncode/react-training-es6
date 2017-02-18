import * as React from 'react';

interface Props {
  label: string;
  name: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: any;
}

export const InputComponent = (props: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>
        {props.label}
      </label>
      <input
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
