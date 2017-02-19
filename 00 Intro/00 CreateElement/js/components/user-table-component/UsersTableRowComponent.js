var UsersTableRowComponent = function (React) {
  var UsersTableRowComponent = function (props) {
    var user = props.user || {};
    return React.createElement(
      "tr",
      { className: "form-group" },
      React.createElement(
        "td",
        null,
        user.name
      ),
      React.createElement(
        "td",
        null,
        user.dateRegistered
      ),
      React.createElement(
        "td",
        null,
        user.role
      ),
      React.createElement(
        "td",
        { className: "text-capitalize" },
        React.createElement(
          "span",
          { className: getLabelStatus(user.status) },
          user.status
        )
      )
    );
  };
  UsersTableRowComponent.displayName = 'UsersTableRowComponent';
  UsersTableRowComponent.propTypes = {
    user: userPropType
  };

  var getLabelStatus = function (status) {
    var label = 'label ';
    var statusList = {
      active: label + ' label-success',
      banned: label + ' label-danger',
      pending: label + ' label-warning'
    };

    return statusList[status] || label;
  };

  return UsersTableRowComponent;
}(window.React);
