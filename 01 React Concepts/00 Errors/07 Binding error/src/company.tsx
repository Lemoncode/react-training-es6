import * as React from 'react';

interface Props extends React.Props<Company> {
  name: string;
}

export default class Company extends React.Component<Props, {}> {
  public render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}
