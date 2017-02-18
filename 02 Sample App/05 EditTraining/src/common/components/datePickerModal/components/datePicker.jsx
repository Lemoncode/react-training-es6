import * as React from 'react';
import {AutoSizer} from 'react-virtualized';
import InfiniteCalendar from 'react-infinite-calendar';
import classNames from './datePickerStyles';

// https://github.com/clauderic/react-infinite-calendar/issues/60
export const DatePickerComponent = (props) => {
  return (
    <AutoSizer>
    {
      ({width, height}) =>
      <div>
        <button
          type="button"
          className={`close ${classNames.closeButton}`}
          onClick={props.onClose}
        >
          <span>&times;</span>
        </button>
        <InfiniteCalendar
          width={width}
          height={height}
          selectedDate={props.selectedDate}
          afterSelect={props.onChange}
          showHeader={false}
        />
      </div>
    }
    </AutoSizer>
  );
};

DatePickerComponent.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  selectedDate: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}
