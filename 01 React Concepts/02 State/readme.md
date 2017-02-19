# 02 State

This sample reuses the modal component from sample [01 React Concepts](../01\ React\ Concepts) and makes it interactive using a button.

The `<Modal/>` component is wrapped in an `<App />` component that stores in its state when to show the modal through a `visible` flag. It also has two methods: `openModal` and `closeModal`. The `<Modal />` component receives via `props` the `closeModal` method and `visible` to do some rendering logic and binds the `closeModal` to the modal.

Both methods changes the `visible` flag in `<App />` state so when some of those are invoked `App`'s `render` method is invoked.
