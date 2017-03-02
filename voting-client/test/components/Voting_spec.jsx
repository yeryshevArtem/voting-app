import React from 'react';
import ReactDOM from 'react-dom';

import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';

import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {
  
  //1
  it('renders a pair of buttons', () => {
    const component = renderIntoDocument(
       <Voting pair={["Trainspotting", "28 Days Later"]} />
    );
    const button = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(button.length).to.equal(2);
    expect(button[0].textContent).to.equal('Trainspotting');
    expect(button[1].textContent).to.equal('28 Days Later');
  });

  //2
  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => {
      votedWith = entry;
    }
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });

  //3
  it('отключает кнопку, как только пользователь проголосует', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
            hasVoted="Trainspotting" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons.[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons.[1].hasAttribute('disabled')).to.equal(true);
  });

  //4
  it('добавляет label к записи, за которую проголосовали', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
         hasVoted="Trainspotting" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Voted');
  });

  //5
  it('отрисовывает только победителя', () => {
    const component = renderIntoDocument(
      <Voting winner="Trainspotting" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
