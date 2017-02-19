import * as React from 'react';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js
export const TableRowComponent = (props) => {
  const cellRenderer = (cell, index) => {
    return (
      <div
        key={index}
        className={props.columns[index].props.className}
        style={props.columns[index].props.style}
      >
        {cell}
      </div>
    );
  };

  return (
    <div className={props.className} key={props.rowKey} style={props.style}>
      {
        React.Children.toArray(props.children).map((child, i) => cellRenderer(child, i))
      }
    </div>
  );
}

TableRowComponent.propTypes = {
  className: React.PropTypes.string.isRequired,
  style: React.PropTypes.any.isRequired,
  columns: React.PropTypes.any.isRequired,
  index: React.PropTypes.number.isRequired,
  isScrolling: React.PropTypes.bool.isRequired,
  onRowClick: React.PropTypes.func,
  onRowDoubleClick: React.PropTypes.func,
  onRowMouseOver: React.PropTypes.func,
  onRowMouseOut: React.PropTypes.func,
  rowKey: React.PropTypes.any.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.arrayOf(React.PropTypes.element),
  ]),
}
