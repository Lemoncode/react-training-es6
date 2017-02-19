var PanelComponent = function (React) {
  var PanelComponent = function (props) {
    return React.createElement(
      "div",
      { className: "panel panel-primary" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        React.createElement(
          "h3",
          { className: "panel-title" },
          React.createElement(
            "strong",
            null,
            props.title
          )
        )
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        props.children
      )
    );
  };

  PanelComponent.displayName = 'PanelComponent';
  PanelComponent.propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.node), React.PropTypes.node])
  };

  return PanelComponent;
}(window.React);
