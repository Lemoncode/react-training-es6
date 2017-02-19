import * as React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode | React.ReactNode[];
}

const PanelComponent = (props: Props) => (
  <div className="panel panel-primary">
    <div className="panel-heading">
      <div className="panel-title"><strong>{props.title}</strong></div>
    </div>
    <div className="panel-body">
      {props.children}
    </div>
  </div>
);

export {
  PanelComponent
};
