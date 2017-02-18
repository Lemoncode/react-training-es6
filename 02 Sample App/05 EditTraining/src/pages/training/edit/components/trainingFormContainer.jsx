import * as React from 'react';
import {TrainingFormComponent} from './trainingForm';

export class TrainingFormComponentContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpenStartDateModal: false,
      isOpenEndDateModal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.toggleOpenStartDateModal = this.toggleOpenStartDateModal.bind(this);
    this.toggleOpenEndDateModal = this.toggleOpenEndDateModal.bind(this);
    this.save = this.save.bind(this);
  }

  onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(fieldName, value);
  }

  onChangeStartDate(date) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  onChangeEndDate(date) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  onChangeDate(fieldName, date) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

  toggleOpenStartDateModal() {
    this.toggleOpenModal('isOpenStartDateModal');
  }

  toggleOpenEndDateModal() {
    this.toggleOpenModal('isOpenEndDateModal');
  }

  toggleOpenModal(fieldName) {
    this.setState({
      ...this.state,
      [fieldName]: !this.state[fieldName]
    });
  }

  save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  render() {
    return (
      <TrainingFormComponent
        training={this.props.training}
        onChange={this.onChange}
        save={this.save}
        isOpenStartDateModal={this.state.isOpenStartDateModal}
        toggleOpenStartDateModal={this.toggleOpenStartDateModal}
        onChangeStartDate={this.onChangeStartDate}
        isOpenEndDateModal={this.state.isOpenEndDateModal}
        toggleOpenEndDateModal={this.toggleOpenEndDateModal}
        onChangeEndDate={this.onChangeEndDate}
      />
    );
  }
};

TrainingFormComponentContainer.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  onChange: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}
