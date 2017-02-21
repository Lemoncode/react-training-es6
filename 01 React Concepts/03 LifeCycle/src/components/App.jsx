import React from 'react';
import { FormColor } from './FormColor';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <main className="container">
        <header>
          <h2 className="col-sm-6 col-sm-offset-1">React component lifecycle methods</h2>
        </header>
        <FormColor onSubmit={this.onSubmit} />
      </main>
    );
  }

  onSubmit(color) {
    alert(`The sent color '${color}' was stored in <App /> model.`);
    this.setState({ color });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Do not trigger render if colors are the same
    return this.state.color !== nextState.color;
  }

}
