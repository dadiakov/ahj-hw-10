/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */

function checkCoordsInput(coords) {
  return /^\[?\-?\d{1,2}\.\d{1,5}\,\s?\-?\d{1,2}\.\d{1,5}\]?/.test(coords);
}

test('test validity', () => {
  expect(checkCoordsInput('51.50851, -0.12572')).toBeTruthy();
  expect(checkCoordsInput('51.50851,-0.12572')).toBeTruthy();
  expect(checkCoordsInput('[51.50851, -0.12572]')).toBeTruthy();
  expect(checkCoordsInput('[-51.50851, -0.12572]')).toBeTruthy();
  expect(checkCoordsInput('(51.50851, -0.12572)')).toBeFalsy();
});
