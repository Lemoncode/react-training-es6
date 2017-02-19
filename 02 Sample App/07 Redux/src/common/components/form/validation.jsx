import * as React from 'react';
import classNames from './validationStyles';

export const ValidationComponent = (props) => {
  let wrapperClass: string = `${props.className}`;

  if(props.error && props.error.length > 0) {
    wrapperClass = `${wrapperClass} has-error`;
  }

  return (
    <div className={wrapperClass}>
      {props.children}
      <div className={`help-block ${classNames.error}`}>
        {props.error}
      </div>
    </div>
  );
}

ValidationComponent.propTypes = {
  error: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
}
