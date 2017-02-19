import * as React from 'react';

interface Props extends React.Props<Company> {
  name: string;
}

class Company extends React.Component<Props, {}> {
  public render() {
    return (
      <h1>{this.props.name}</h1>
    );
  }
}

export default Company;
