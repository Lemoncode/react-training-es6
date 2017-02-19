import * as React from 'react';
import Modal from 'react-modal';
import {DatePickerComponent} from './components/datePicker';
import classNames from './datePickerModalStyles';

export const DatePickerModalComponent = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Date Picker Modal"
      onRequestClose={props.onClose}
      className={`${classNames.modal} modal-dialog modal-open`}
      overlayClassName={classNames.overlay}
    >
      <DatePickerComponent
        onClose={props.onClose}
        selectedDate={props.selectedDate}
        onChange={props.onChange}
      />
    </Modal>
  );
};

DatePickerModalComponent.propTypes = {
  isOpen: React.PropTypes.bool.isRequired,
  onClose: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
