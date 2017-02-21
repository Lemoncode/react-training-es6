# React component lifecycles

This sample shows a simple form (that could be part of a model with more data) with a ColorPicker component. This colorpicker wraps a jQuery colorpicker component to choose a color and send it back to App's model.

The main component lifecycle methods managed are:

- `render`: When `<App />` and `<ColorPicker />` components are mounted `render` method is called resulting in HTML changes.
- `componentDidMount` used by `<ColorPicker />` to do some DOM operations like raise jQuery colorpicker component.
- `shouldComponentUpdate` used by `<App />` when `<ColorPicker />` gives the same color.
- `componentDidUpdate` used by `<ColorPicker />` when a new `color` is given in its props, it is passed to the jQuery colorpicker.
- `componentWillUnmount` used by `<ColorPicker />` when it is going to be unmounted, it destroys jQuery component (and with it all it's events attached and DOM elements).
