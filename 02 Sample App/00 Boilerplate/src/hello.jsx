import * as React from 'react';
const classNames: any = require('./helloStyles');

export const HelloComponent = () => {
  return (
    <h1 className={classNames.testClass}>Hello from React</h1>
  );
}
