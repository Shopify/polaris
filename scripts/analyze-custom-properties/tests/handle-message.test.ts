import {handleMessage} from '../analyze-custom-properties';

import {mockCustomProperties, mockCustomPropertyErrors} from './fixtures';

describe('handleMessage', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleTableSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    consoleLogSpy.mockImplementation(() => {});
    consoleTableSpy = jest.spyOn(console, 'table');
    consoleTableSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleTableSpy.mockRestore();
  });

  it(`doesn't log any information when logLevel is 'never'`, () => {
    handleMessage(
      mockCustomProperties,
      mockCustomPropertyErrors,
      {uniqueCustomProperties: 0, totalCustomProperties: 0},
      'never',
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    expect(consoleTableSpy).toHaveBeenCalledTimes(0);
  });

  it('logs errors when logLevel is `verbose`', () => {
    handleMessage(
      mockCustomProperties,
      mockCustomPropertyErrors,
      {uniqueCustomProperties: 0, totalCustomProperties: 0},
      'verbose',
    );

    // One error log
    // Two regularly expected logs
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
  });

  it('logs errors when logLevel is `error`', () => {
    handleMessage(
      mockCustomProperties,
      mockCustomPropertyErrors,
      {uniqueCustomProperties: 0, totalCustomProperties: 0},
      'error',
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
  });

  it('logs information when logLevel is `verbose`', () => {
    handleMessage(
      mockCustomProperties,
      {},
      {uniqueCustomProperties: 0, totalCustomProperties: 0},
      'verbose',
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleTableSpy).toHaveBeenCalledTimes(1);
  });

  it('logs information when logLevel is `info`', () => {
    handleMessage(
      mockCustomProperties,
      mockCustomPropertyErrors,
      {uniqueCustomProperties: 0, totalCustomProperties: 0},
      'info',
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleTableSpy).toHaveBeenCalledTimes(1);
  });
});
