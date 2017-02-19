import * as React from 'react';

export const PanelComponent = (props) => (
  <div className="panel panel-primary">
    <div className="panel-heading">
      <div className="panel-title"><strong>{props.title}</strong></div>
    </div>
    <div className="panel-body">
      {props.children}
    </div>
  </div>
);

PanelComponent.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
}
