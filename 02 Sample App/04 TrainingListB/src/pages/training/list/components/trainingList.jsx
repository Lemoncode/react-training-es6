import * as React from 'react';
import {TrainingRowComponent} from './trainingRow';
import {AutoSizer, Table, Column} from 'react-virtualized';
import classNames from './trainingListStyles';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md
// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md
export const TrainingListComponent = (props) => {
  const getWidthByPercentage = (width, percentage) => {
    return (percentage * width) / 100;
  };

  return (
    <div className="container">
      <AutoSizer disableHeight>
        {
          ({width}) =>
            <Table
              width={width}
              height={500}
              headerHeight={40}
              headerClassName={classNames.header}
              rowCount={props.trainings.length}
              rowHeight={50}
              rowGetter={({index}) => props.trainings[index]}
              rowRenderer={TrainingRowComponent}
              rowClassName={classNames.row}
            >
              <Column
                label='Active'
                dataKey='isActive'
                width={getWidthByPercentage(width, 10)}
              />
              <Column
                label='Name'
                dataKey='name'
                width={getWidthByPercentage(width, 20)}
              />
              <Column
                label='Link to course'
                dataKey='url'
                width={getWidthByPercentage(width, 60)}
              />
              <Column
                label=''
                dataKey=''
                width={getWidthByPercentage(width, 10)}
              />
            </Table>
        }
      </AutoSizer>
    </div>
  );
};

TrainingListComponent.propTypes = {
  trainings: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      startDate: React.PropTypes.number.isRequired,
      endDate: React.PropTypes.number.isRequired,
      isActive: React.PropTypes.bool.isRequired,
    })
  ).isRequired,
}
