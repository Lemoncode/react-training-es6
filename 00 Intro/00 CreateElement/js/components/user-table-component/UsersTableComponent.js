var UsersTableComponent = function (React) {
  var UsersTableComponent = function (props) {
    var users = props.users || [];
    return React.createElement(
      'table',
      { className: 'table table-striped table-condensed' },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement('th', null, 'Username'),
          React.createElement('th', null, 'Date registered'),
          React.createElement('th', null, 'Role'),
          React.createElement('th', null, 'Status')
        )
      ),
      React.createElement(
        'tbody',
        null,
        users.map(function (user) {
          return React.createElement(
            UsersTableRowComponent,
            { key: user.id, user: user }
          );
        })
      )
    );
  };
  UsersTableComponent.displayName = 'UsersTableComponent';
  UsersTableComponent.propTypes = {
    users: React.PropTypes.arrayOf(userPropType)
  };

  return UsersTableComponent;
}(window.React);
