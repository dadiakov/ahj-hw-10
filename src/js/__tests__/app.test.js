/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import Message from '../Message';

test('test validity', () => {
  expect(Message.checkCoordsInput('51.50851, -0.12572')).toBeTruthy();
  expect(Message.checkCoordsInput('51.50851,-0.12572')).toBeTruthy();
  expect(Message.checkCoordsInput('[51.50851, -0.12572]')).toBeTruthy();
  expect(Message.checkCoordsInput('(51.50851, -0.12572)')).toBeFalsy();
});
