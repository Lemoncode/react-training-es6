import * as React from 'react';
import moment from 'moment';
import {InputComponent} from '../../../../common/components/form/input';
import {CheckBoxComponent} from '../../../../common/components/form/checkBox';
import {InputButtonComponent} from '../../../../common/components/form/inputButton';

export class TrainingFormComponent extends React.Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.save = this.save.bind(this);
  }

  onChange (event) {
    const fieldName = event.target.name;
    const value = event.target.type === 'checkbox' ?
      event.target.checked :
      event.target.value;

    this.props.onChange(fieldName, value);
  }

  onChangeStartDate(date: moment.Moment) {
    this.onChangeDate('startDate', date);
    this.toggleOpenStartDateModal();
  }

  onChangeEndDate(date: moment.Moment) {
    this.onChangeDate('endDate', date);
    this.toggleOpenEndDateModal();
  }

  onChangeDate(fieldName: string, date: moment.Moment) {
    const milliseconds = date.valueOf();
    this.props.onChange(fieldName, milliseconds);
  }

  save(event) {
    event.preventDefault();
    this.props.save(this.props.training);
  }

  render() {
    return (
      <form className="container">
        <div className="row">
          <InputComponent
            className="col-md-6"
            type="text"
            label="Name"
            name="name"
            onChange={this.onChange}
            value={this.props.training.name}
            placeholder="Name"
          />

          <InputComponent
            className="col-md-6"
            type="text"
            label="Url"
            name="url"
            onChange={this.onChange}
            value={this.props.training.url}
            placeholder="Url"
          />
        </div>

        <div className="row">
          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="Start date"
            name="startDate"
            placeholder="Start date"
            value={moment(this.props.training.startDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {}}
            icon="glyphicon glyphicon-calendar"
          />

          <InputButtonComponent
            className="col-md-6"
            type="text"
            label="End date"
            name="endDate"
            placeholder="End date"
            value={moment(this.props.training.endDate).format('YYYY-MM-DD')}
            onChange={this.onChange}
            disabled
            buttonClassName="btn btn-default"
            onClick={() => {}}
            icon="glyphicon glyphicon-calendar"
          />
        </div>

        <div className="row">
          <CheckBoxComponent
            className="col-md-6"
            label="Active"
            name="isActive"
            onChange={this.onChange}
            value={this.props.training.isActive}
          />
        </div>

        <div className="row">
          <div className="form-group pull-right">
            <div className="col-md-1">
              <button type="button" className="btn btn-lg btn-success" onClick={this.save}>
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
};

TrainingFormComponent.propTypes = {
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
