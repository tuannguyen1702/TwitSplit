/* global describe, it */
import { shallow } from 'enzyme'
import React from 'react'
import expect from 'expect.js'

import { splitString, prepareString } from '../utils/index.js'

describe('With Enzyme', () => {
  it('Input - happy case', () => {
    const result = splitString(`I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.`)

    expect(result.length).to.equal(2);
    expect(result[0]).to.equal(`1/2 I can't believe Tweeter now supports chunking`);
    expect(result[1]).to.equal(`2/2 my messages, so I don't have to do it myself.`)
  });

  it('Input - the word of content is incorrect', () => {
    const result = splitString(`IcantbelieveTweeternowsupportschunkingmymessagessoIdon'thavetodoitmyself.`)
    expect(result).to.equal(null);
  });

  it('Input - multiple whitespace', () => {
    const newString = prepareString(`I     can't     believe    Tweeter now supports chunking my messages, so I don't have to do it myself.`)
    const result = splitString(newString);
    expect(result.length).to.equal(2);
    expect(result[0]).to.equal(`1/2 I can't believe Tweeter now supports chunking`);
    expect(result[1]).to.equal(`2/2 my messages, so I don't have to do it myself.`)
  });

  it('Input - long string', () => {
    const newString = prepareString(`We want to see how you create a new project and what technologies you decide to you use. A good project will be cleanly structured, will only contain the dependencies it needs, and will be well-documented and well-tested. What matters is not the technologies you use, but the reasons for your decisions. Bonus points will be given for demonstrating knowledge of modern Javascript techniques and best practices.`)
    const result = splitString(newString);
    expect(result.length).to.equal(10);
    expect(result[0]).to.equal(`1/10 We want to see how you create a new project`);
    expect(result[9]).to.equal(`10/10 best practices.`)
  });
})
