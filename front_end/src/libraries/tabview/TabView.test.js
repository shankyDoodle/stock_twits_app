import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TabView from "./TabView";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        label:"",
        body:{}
    }
    const enzymeWrapper = shallow(<TabView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('TabView', function() {
    it('TabView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.tabViewWrapper').length).toBe(1);
    });
});