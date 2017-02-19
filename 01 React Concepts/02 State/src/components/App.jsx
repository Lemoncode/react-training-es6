import * as React from 'react';
import { Modal } from './Modal';

interface State {
  isModalOpen: boolean;
}

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <div className="container text-center" style={{ marginTop: '50px' }}>
        <Modal visible={this.state.isModalOpen} onClick={this.closeModal} />
        <button className="btn btn-primary" onClick={this.openModal}>Click me!</button>
      </div>
    );
  }
};

App.propTypes = {
  isModalOpen: React.PropTypes.bool.isRequired,
};
