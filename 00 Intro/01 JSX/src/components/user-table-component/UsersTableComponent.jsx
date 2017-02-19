import * as React from 'react';
import { UsersTableRowComponent } from './UsersTableRowComponent';

export const UsersTableComponent = (props) => (
  <table className="table table-stripped table-condensed">
    <thead>
      <tr>
        <th>Fullname</th>
        <th>Date Registered</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {props.users.map(user => <UsersTableRowComponent key={user.id} user={user} />)}
    </tbody>
  </table>
);

UsersTableRowComponent.propTypes = {
  users: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      id: React.PropTypes.number,
      name: React.PropTypes.string.isRequired,
      dateRegistered: React.PropTypes.string.isRequired,
      role: React.PropTypes.string.isRequired,
      status: React.PropTypes.string.isRequired,
    }).isRequired
  ),
};
