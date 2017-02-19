var App = function (React) {
  var App = React.createClass({
    displayName: 'App',
    getInitialState: function () {
      return {
        users: [
          { id: 123, name: 'Donna R. Folse', dateRegistered: '2012/05/06', role: 'Editor', status: 'active' },
          { id: 124, name: 'Emily F. Burns', dateRegistered: '2011/12/01', role: 'Staff', status: 'banned' },
          { id: 125, name: 'Andrew A. Stout', dateRegistered: '2010/08/21', role: 'Inactive', status: 'pending' },
          { id: 126, name: 'Mary M. Bryan', dateRegistered: '2009/04/11', role: 'Editor', status: 'pending' },
          { id: 127, name: 'Mary A. Lewis', dateRegistered: '2007/02/01', role: 'Staff', status: 'active' }
        ]
      }
    },
    render: function () {
      return React.createElement(
        PanelComponent,
        { title: 'Users summary' },
        React.createElement(UsersTableComponent, { users: this.state.users })
      );
    }
  });

  return App;
}(window.React);
