const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');
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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'TestSuite';
    const latitude = 25.123123;
    const longitude = -25.112235;
    const url = `https://www.google.com/maps?q=25.123123,-25.112235`;

    const message = generateLocationMessage(from, latitude, longitude);

    expect(message).toInclude({ from, url });
    expect(message.createdAt).toExist().toBeA('number');
  })
})
