import React from 'react';
import { mount } from 'enzyme';

import App from '../src/App';
import Heading from '../src/components/heading-component-world';

describe('<App />', () => {
  const wrap = mount(<App />);

  it('renders', () => {
    expect(wrap.find(App).exists()).toBe(true);
  });

  it('contains Heading component', () => {
    expect(wrap.find(Heading).exists()).toBe(true);
  });
});
