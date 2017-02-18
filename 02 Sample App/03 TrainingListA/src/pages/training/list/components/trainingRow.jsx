import * as React from 'react';

export const TrainingRowComponent = (props) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={props.training.isActive}
          disabled
        />
      </td>
      <td>
        <span>{props.training.name}</span>
      </td>
      <td>
        <a href={props.training.url} target="blank">{props.training.url}</a>
      </td>
      <td>
        <a className="btn btn-primary"><i className="glyphicon glyphicon-pencil" /></a>
      </td>
    </tr>
  );
}

TrainingRowComponent.propTypes = {
  training: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    startDate: React.PropTypes.number.isRequired,
    endDate: React.PropTypes.number.isRequired,
    isActive: React.PropTypes.bool.isRequired,
  }).isRequired,
}
