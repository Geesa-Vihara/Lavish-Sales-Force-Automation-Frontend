import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SalesRepTable from '../SalesRep/SalesRepTable';


it("should call componentDidMount once",()=>{
    componentDidMountSpy = spyOn(SalesRepTable.prototype,"componentDidMount");
});
const salesrepComponent = shallow(<SalesRepTable/>);
expect(componentDidMountSpy).toHaveBeenCalledTimes(1);

it('should populate state',()=>{
    salesrepComponent = shallow(<SalesRepTable/>);
    expect(salesrepComponent.state().salesreps.length).toEqual(10)
})