import { awesomeLogger } from '../index';

const logger = awesomeLogger('My Application :', 'silly', true, 'logs/', 'my-app-log', 'error', true, true, true, true);

test('Logger Error', () => {
  logger.error = jest.fn();
  logger.error('Hello Error');
  expect(logger.error).toHaveBeenCalledWith('Hello Error');
});
