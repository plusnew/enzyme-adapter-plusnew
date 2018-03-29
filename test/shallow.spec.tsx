import enzymeAdapterPlusnew from 'index';
import { configure, shallow } from 'enzyme';
import plusnew, { component } from 'plusnew';

configure({ adapter: new enzymeAdapterPlusnew() });

describe('test App.tsx', () => {
  it('true should be true', () => {
    const App = component(
      () => ({}),
      () => <button />,
    )
    const wrapper = shallow(<App /> as any);
    expect(wrapper.find(<button />).length).toBe(1);
    expect(wrapper.find(<input />).length).toBe(0);

  });
});
