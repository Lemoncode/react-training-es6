# 04 TrainingListB

We will take as startup point sample _03 TrainingListA_.

In this sample we will render table of trainings with a second approach, we will use [React virtualized](https://github.com/bvaughn/react-virtualized).

Summary steps:

- Install react virtualized.
- Replace HTML table by react virtualized table.

## Steps to build it

- We need to install react-virtualized (it has react-addons-shallow-compare as dependency):

```
npm install react-addons-shallow-compare --save
npm install react-virtualized --save
```

- Add lib as vendor and vendorStyles:

### ./webpack.config.js
```diff
entry: {
  ...
  vendor: [
    ...
    'toastr',
+   'react-addons-shallow-compare',
+   'react-virtualized',
  ],
  vendorStyles: [
    '../node_modules/bootstrap/dist/css/bootstrap.css',
    '../node_modules/toastr/build/toastr.css',
+   '../node_modules/react-virtualized/styles.css',
  ],
```

- This time, we are going to start with TrainingListComponent and go down through child components. There are three react-virtualized components that we are going to use here: [AutoSizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md), [Table](https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md) and [Column](https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md).

- AutoSizer is a HOC that calculate width and height of a single child.
- Table to render a table component with fixed headers.
- Column is a Table child component to render each columns.

### ./src/pages/training/list/components/trainingList.jsx
```diff
import * as React from 'react';
import {TrainingHeadComponent} from './trainingHead';
import {TrainingRowComponent} from './trainingRow';
+ import {AutoSizer, Table, Column} from 'react-virtualized';

+ // https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md
+ // https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
+ // https://github.com/bvaughn/react-virtualized/blob/master/docs/Column.md

export const TrainingListComponent = (props) => {

+ const getWidthByPercentage = (width, percentage) => {
+   return (percentage * width) / 100;
+ };

  return (
    <div className="container">
-     <table className="table table-striped">
-       <TrainingHeadComponent />
-       <tbody>
-         {
-           props.trainings.map((training) => (
-             <TrainingRowComponent
-               key={training.id}
-               training={training}
-             />
-           ))
-         }
-       </tbody>
-     </table>
+     <AutoSizer disableHeight>
+       {
+         ({width}) =>
+           <Table
+             width={width}
+             height={500}
+             headerHeight={40}
+             rowCount={props.trainings.length}
+             rowHeight={50}
+             rowGetter={({index}) => props.trainings[index]}
+           >
+             <Column
+               label='Active'
+               dataKey='isActive'
+               width={getWidthByPercentage(width, 10)}
+             />
+             <Column
+               label='Name'
+               dataKey='name'
+               width={getWidthByPercentage(width, 20)}
+             />
+             <Column
+               label='Link to course'
+               dataKey='url'
+               width={getWidthByPercentage(width, 60)}
+             />
+             <Column
+               label=''
+               dataKey=''
+               width={getWidthByPercentage(width, 10)}
+             />
+           </Table>
+       }
+     </AutoSizer>
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

```

- With previous code, we are render 4 columns but only render data. Table component has a `rowRenderer` property where we can pass a Row component and customize each row:

### ./src/pages/training/list/components/trainingRow.jsx
```diff
import * as React from 'react';

+ // https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
+ // https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js
export const TrainingRowComponent = (props) => {
  return (
-   <tr>
-     <td>
-       <input
-         type="checkbox"
-         checked={props.training.isActive}
-         disabled
-       />
-     </td>
-     <td>
-       <span>{props.training.name}</span>
-     </td>
-     <td>
-       <a href={props.training.url} target="blank">{props.training.url}</a>
-     </td>
-     <td>
-       <a className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
-     </td>
-   </tr>
+   <div className={props.className} key={props.key} style={props.style}>
+     <div
+       className={props.columns[0].props.className}
+       style={props.columns[0].props.style}
+     >
+       <input
+         type="checkbox"
+         checked={props.rowData.isActive}
+         disabled
+       />
+     </div>
+     <div
+       className={props.columns[1].props.className}
+       style={props.columns[1].props.style}
+     >
+       <span>{props.rowData.name}</span>
+     </div>
+     <div
+       className={props.columns[2].props.className}
+       style={props.columns[2].props.style}
+     >
+       <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
+     </div>
+     <div
+       className={`${props.columns[3].props.className}`}
+       style={props.columns[3].props.style}
+     >
+       <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
+     </div>
+   </div>
  );
}

TrainingRowComponent.propTypes = {
- training: React.PropTypes.shape({
+ rowData: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
+ className: React.PropTypes.string.isRequired,
+ style: React.PropTypes.any.isRequired,
+ columns: React.PropTypes.any.isRequired,
+ index: React.PropTypes.number.isRequired,
+ key: React.PropTypes.any.isRequired,
+ isScrolling: React.PropTypes.bool.isRequired,
+ onRowClick: React.PropTypes.func,
+ onRowDoubleClick: React.PropTypes.func,
+ onRowMouseOver: React.PropTypes.func,
+ onRowMouseOut: React.PropTypes.func,
}

```

- As we see, there is too much code that we can reuse, so let's go to follow DRY principle:

### ./src/common/components/tableRow.jsx
```javascript
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

```

### ./src/pages/training/list/components/trainingRow.jsx
```diff
import * as React from 'react';
import {TableRowComponent} from '../../../../common/components/tableRow';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js

+ // We can use spread operator for React properties too
+ // https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props: Props) => {
  return (
-   <div className={props.className} key={props.key} style={props.style}>
-     <div
-       className={props.colums[0].props.className}
-       style={props.columns[0].props.style}
-     >
-       <input
-         type="checkbox"
-         checked={props.rowData.isActive}
-         disabled
-       />
-     </div>
-     <div
-       className={props.columns[1].props.className}
-       style={props.columns[1].props.style}
-     >
-       <span>{props.rowData.name}</span>
-     </div>
-     <div
-       className={props.columns[2].props.className}
-       style={props.columns[2].props.style}
-     >
-       <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
-     </div>
-     <div
-       className={`${props.columns[3].props.className}`}
-       style={props.columns[3].props.style}
-     >
-       <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
-     </div>
-   </div>
+   <TableRowComponent
+     {...props}
+     rowKey={props.key}
+   >
+     <input type="checkbox" checked={props.rowData.isActive} disabled/>
+     <span>{props.rowData.name}</span>
+     <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
+     <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
+   </TableRowComponent>
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

```

- We can use _TrainingRowComponent_ in trainingList:

### ./src/pages/training/list/components/trainingList.jsx
```diff
...
<Table
  width={width}
  height={500}
  headerHeight={40}
  rowCount={props.trainings.length}
  rowHeight={50}
  rowGetter={({index}) => props.trainings[index]}
+ rowRenderer={TrainingRowComponent}
>
  <Column
    label='Active'
...
```

- And of course, we don't need _TrainingHeadComponent_ any more:

### ./src/pages/training/list/components/trainingList.jsx
```diff
import * as React from 'react';
- import {TrainingHeadComponent} from './trainingHead';
import {TrainingRowComponent} from './trainingRow';
```

- Now it's time to give `Table component` some styles like sample 03 TrainingListA:

### ./src/pages/training/list/components/trainingListStyles.css
```css
.header {
  text-transform: none;
}

.row {
  border-bottom: 2px solid #ddd;
}

```

### ./src/pages/training/list/components/trainingList.jsx
```diff
import * as React from 'react';
import {TrainingRowComponent} from './trainingRow';
import {AutoSizer, Table, Column} from 'react-virtualized';
+ import classNames from './trainingListStyles';

...
<Table
  width={width}
  height={500}
  headerHeight={40}
+ headerClassName={classNames.header}
  rowCount={props.trainings.length}
  rowHeight={50}
  rowGetter={({index}) => props.trainings[index]}
  rowRenderer={TrainingRowComponent}
+ rowClassName={classNames.row}
>
  <Column
    label='Active'
...

```

- And striped rows:

### ./src/pages/training/list/components/trainingRowStyles.css
```css
.row-striped:nth-child(odd) {
  background-color: #f9f9f9;
}

```

### ./src/pages/training/list/components/trainingRow.jsx
```diff
import * as React from 'react';
import {Training} from '../../../../models/training';
import {TableRowProps, TableRowComponent} from '../../../../common/components/tableRow';
+ import classNames from './trainingRowStyles';

// https://github.com/bvaughn/react-virtualized/blob/master/docs/Table.md
// https://github.com/bvaughn/react-virtualized/blob/master/source/Table/defaultRowRenderer.js

// We can use spread operator for React properties too
// https://facebook.github.io/react/docs/jsx-in-depth.html#spread-attributes
export const TrainingRowComponent = (props) => {
  return (
    <TableRowComponent
      {...props}
      rowKey={props.key}
+     // We have enable camelCase parser in webpack.config.js
+     className={`${props.className} ${classNames.rowStriped}`}
    >
      <input type="checkbox" checked={props.rowData.isActive} disabled/>
      <span>{props.rowData.name}</span>
      <a href={props.rowData.url} target="blank">{props.rowData.url}</a>
      <a className=" btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
    </TableRowComponent>
  );
}

```

## Why are we using React Virtualized

- We can play with table height and see which rows of table has been rendering:

### ./src/pages/training/list/components/trainingList.jsx
```javascript
...
<Table
  width={width}
- height={500}
+ height={200}
  headerHeight={40}
  headerClassName={classNames.header}
  rowCount={props.trainings.length}
  rowHeight={50}
  rowGetter={({index}) => props.trainings[index]}
  rowRenderer={TrainingRowComponent}
  rowClassName={classNames.row}
+ overscanRowCount={0}
...
```
