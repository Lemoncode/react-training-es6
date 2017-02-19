import * as React from 'react';

export const UsersTableRowComponent = (props) => (
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

UsersTableRowComponent.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    dateRegistered: React.PropTypes.string.isRequired,
    role: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  }).isRequired,
};
