import * as React from 'react';
import { User } from '../../entity/User';
import { UsersTableRowComponent } from './UsersTableRowComponent';

interface Props {
  users: User[]
}

const UsersTableComponent = (props: Props) => (
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

export {
  UsersTableComponent
};
