var userPropType = (function (React) {
  return React.PropTypes.shape({
    id: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    dateRegistered: React.PropTypes.string.isRequired,
    role: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  });
})(window.React);
