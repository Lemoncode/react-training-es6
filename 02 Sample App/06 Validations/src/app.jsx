import * as React from 'react';
import classNames from './appStyles';

// With this.props.children we are placing App children components
// where we want to render it.
export class App extends React.Component {
  render() {
    return (
      <div className={`container-fluid ${classNames.app}`}>
       {this.props.children}
      </div>
    );
  }
}
