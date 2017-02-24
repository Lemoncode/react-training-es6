import * as React from 'react';
import {Link} from 'react-router';
import {TableRowComponent} from '../../../../common/components/tableRow';
import classNames from './trainingRowStyles';
import {routeConstants} from '../../../../common/constants/routeConstants';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js

// We can use spread operator for React properties too
// https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props) => {
  return (
    <TableRowComponent
      {...props}
      rowKey={props.key}
      // We have enable camelCase parser in webpack.config.js
      className={`${props.className} ${classNames.rowStriped}`}
    >
      <input type="checkbox" checked={props.rowData.isActive} disabled/>
      <span>{props.rowData.name}</span>
      <a href={props.rowData.url} target="_blank">{props.rowData.url}</a>
      <Link
        to={`${routeConstants.training.edit}/${props.rowData.id}`}
        className=" btn btn-primary"
      >
        <i className="glyphicon glyphicon-pencil" />
      </Link>
    </TableRowComponent>
  );
}

TrainingRowComponent.propTypes = {
  rowData: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
  className: React.PropTypes.string.isRequired,
  style: React.PropTypes.any.isRequired,
  columns: React.PropTypes.any.isRequired,
  index: React.PropTypes.number.isRequired,
  key: React.PropTypes.any.isRequired,
  isScrolling: React.PropTypes.bool.isRequired,
  onRowClick: React.PropTypes.func,
  onRowDoubleClick: React.PropTypes.func,
  onRowMouseOver: React.PropTypes.func,
  onRowMouseOut: React.PropTypes.func,
}
