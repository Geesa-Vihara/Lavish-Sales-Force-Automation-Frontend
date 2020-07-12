import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SalesRepTable from '../SalesRep/SalesRepTable';

//jest.dontMock('../SalesrepTable');
//const SalesRepTable = require('../SalesRep/SalesRepTable')

describe('Salesrep', () => {
 
    // it('passing test', () => {
    //   expect(true).toBeTruthy();
    // })
   
    // it('failing test', () => {
    //   expect(false).toBeFalsy();
    // })
    it('has a title class', () => {
        const component = shallow(<SalesRepTable/>);
        var node = component.find('div');
        expect(node.hasClass('root')).toBeTruthy();
      })

  })

  
