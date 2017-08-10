const expect = require('expect');
const { generateMessage } = require('./message');
const { describe, it } = require('mocha');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'TestSuite';
    const text = 'Some message for testing';
    const message = generateMessage(from, text);

    expect(message).toInclude({from, text});
    expect(message.createdAt).toExist().toBeA('number');
  });
});
