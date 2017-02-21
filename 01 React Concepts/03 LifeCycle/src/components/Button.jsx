import React from 'react';


export const Button = (props) => (
  <button
    type="button"
    onClick={props.onClick}
    className="btn btn-default white"
    style={{ backgroundColor: props.color }}>{props.children}</button>
);

Button.propTypes = {
  color: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};
