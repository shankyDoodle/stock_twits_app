import React from 'react';
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import {MSSView} from "./MSSView";
import PropTypes from "prop-types";

Enzyme.configure({ adapter: new Adapter() })
function setup() {
    const props = {
        label:"",
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onEnterPress: jest.fn(),
        childElements: [],
        selected: [],
        isMultiple: true,
        allowClear: true,
        selectAll: true,
        disabled: true,
    }
    const enzymeWrapper = shallow(<MSSView {...props} />)
    return {
        props,
        enzymeWrapper
    }
}


describe('MSSView', function() {
    it('MSSView should render without error', function() {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.find('.mssViewWrapper').length).toBe(1);
    });
});