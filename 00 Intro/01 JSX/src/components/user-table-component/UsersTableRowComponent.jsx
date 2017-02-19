import * as React from 'react';
import { User } from '../../entity/User';

interface Props {
  user: User;
}

const UsersTableRowComponent = (props: Props) => (
  <tr className="form-group">
    <td>{props.user.name}</td>
    <td>{props.user.dateRegistered}</td>
    <td>{props.user.role}</td>
    <td className="text-capitalize">
      <span className={getLabelStatus(props.user.status)}>{props.user.status}</span>
    </td>
  </tr>
);

const getLabelStatus = function (status: string) {
  const label = 'label ';
  const statusList = {
    active: label + ' label-success',
    banned: label + ' label-danger',
    pending: label + ' label-warning'
  };

  return statusList[status] || label;
};

export {
  UsersTableRowComponent
};
