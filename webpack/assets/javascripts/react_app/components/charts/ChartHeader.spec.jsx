import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';

import ChartHeader from './ChartHeader';

function setup() {
    const props = {
        id: 10,
        onClick: () => {},
        cssClass: "ca pie-title",
        title: "Some Chart"
    };

    return shallow(<ChartHeader {...props} />);
}

describe('Chart header', () => {
    describe('initialization', () => {
        it('runs', () => {
            expect(true).toBe(true);
        });
    });

    describe('ChartHeader via Enzyme', () => {
        it('renders title', () => {
            const wrapper = setup();
            const pieTitle = wrapper.find('.pie-title');
            const tooltip = pieTitle.prop('title');

            expect(pieTitle.length).toBe(1);
            expect(pieTitle.text()).toEqual('Some Chart');

            console.log('title: ' + tooltip);
            
        });

    });
});
