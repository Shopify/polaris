import React from 'react';

jest.mock('../link', () => ({
  Link: jest.fn(),
  __esModule: true,
}));

describe('Link()', () => {
  const Link: jest.Mock<{}> = require.requireMock('../link').Link;

  afterEach(() => {
    Link.mockReset();
  });

  it('returns the right context without properties', () => {
    expect(new Link()).toStrictEqual(expect.any(Link));
  });

  it('returns the right context with properties', () => {
    const CustomLinkComponent = () => {
      return <a href="test">Custom Link Component</a>;
    };

    expect(new Link(CustomLinkComponent)).toStrictEqual(expect.any(Link));

    expect(Link).toHaveBeenCalledWith(CustomLinkComponent);
  });
});
