# 01 Properties

This sample shows a simple modal component that changes its content depending on props passed.

- When property `visible` is passed the modal is displayed.
- When property `text` is passed the modal content is changed.

Both properties are optional so by default if you do not pass 'visible' it is not displayed, and a _You did not passed me text_ is shown if no text property is passed.
This was achieved by using `defaultProps` property inside Modal.
