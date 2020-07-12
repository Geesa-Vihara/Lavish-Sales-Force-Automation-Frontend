import React from 'react';
import ReactDOM from 'react-dom'
import { shallow,mount } from 'enzyme';
import Login from '../../views/Pages/Login';
import TextField from "@material-ui/core/TextField";
import { exportAllDeclaration } from '@babel/types';

describe("checking Login is rendering without crashing",()=>{
    it('renders without crashing',()=>{
        const loginComp=shallow(<Login/>);
        console.log(loginComp.debug());
    });
});
it("Test cases for testing login",()=>{
    let wrapper = shallow(<Login/>);
    wrapper.dive().find('withStyles(TextField)').find('input').simulate('change',{target:{value:"kavishka"}});
    expect(wrapper.state('username')).toEqual("kavishka");

})