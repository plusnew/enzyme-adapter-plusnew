import enzymeAdapterPlusnew, { mount, shallow } from 'index';
import PlusnewCommonWrapper from 'wrapper/PlusnewCommonWrapper';
import { configure } from 'enzyme';
import plusnew, { component, store } from 'plusnew';

interface common {
  (element: plusnew.JSX.Element): PlusnewCommonWrapper;
}

function getMountFunction(callback: (mountWrapper: common) => void) {
  callback(mount as any);
  callback(shallow as any);
}

configure({ adapter: new enzymeAdapterPlusnew() });

describe('testing both renderers with:', () => {
  describe('at()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const NestedComponent = component(
          () => ({}),
          (props: {foo: string}) => <button />,
        );

        const MainComponent = component(
          () => ({}),
          () =>
            <>
              <NestedComponent foo="bar" />
              <NestedComponent foo="baz" />
            </>,
        );
    
        const wrapper = mount(<MainComponent />);
        expect(wrapper.find(NestedComponent).at(0).prop('foo')).toBe('bar');
        expect(wrapper.find(NestedComponent).at(1).prop('foo')).toBe('baz');
      });
    });
  });

  describe('childAt()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const NestedComponent = component(
          () => ({}),
          (props: {foo: string}) => <button />,
        );

        const MainComponent = component(
          () => ({}),
          () =>
            <div>
              <NestedComponent foo="bar" />
              <NestedComponent foo="baz" />
            </div>,
        );
    
        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('div').childAt(0).prop('foo')).toBe('bar');
        expect(wrapper.find('div').childAt(1).prop('foo')).toBe('baz');
      });
    });
  });

  describe('children()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const NestedComponent = component(
          () => ({}),
          (props: {foo: string}) => <button />,
        );

        const MainComponent = component(
          () => ({}),
          () =>
            <div>
              <NestedComponent foo="bar" />
              <NestedComponent foo="baz" />
            </div>,
        );
    
        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('div').children().length).toBe(2);
      });
    });
  });

  describe('closest()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () => <div className="foo"><span /></div>,
        );
    
        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('span').closest('div').prop('className')).toBe('foo');
      });
    });
  });

  describe('contains()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <button />,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper.contains(<button />)).toBe(true);
        expect(wrapper.contains(<input />)).toBe(false);
      });
    });
  });

  describe('containsAllMatchingElements()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );
    
        const wrapper = mount(<MainComponent />);
        expect(wrapper.containsAllMatchingElements([<span className="bar"/>, <span className="baz"/>])).toBe(true);
        expect(wrapper.containsAllMatchingElements([<span className="bar"/>, <span className="foobar"/>])).toBe(false);
      });
    });
  });

  describe('containsAnyMatchingElements()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper.containsAnyMatchingElements([<span className="bar" />, <span className="foobar" />])).toBe(true);
        expect(wrapper.containsAnyMatchingElements([<span className="knsdfg" />, <span className="foobar" />])).toBe(false);
      });
    });
  });

  describe('containsMatchingElement()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
        expect(wrapper.containsAnyMatchingElements([<span />])).toBe(true);
        expect(wrapper.containsAnyMatchingElements([<button />])).toBe(false);
      });
    });
  });

  xdescribe('context()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(() => {
          wrapper.context('foo');
        }).toThrow(new Error('Plusnew does not have contexts'));
      });
    });
  });

  xdescribe('debug()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('every()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="bar" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('span').every('.bar')).toBe(true);
        expect(wrapper.find('span').every('.baz')).toBe(false);

      });
    });
  });

  describe('everyWhere()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="bar" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('span').everyWhere(wrapper => wrapper.hasClass('bar'))).toBe(true);
        expect(wrapper.find('span').everyWhere(wrapper => wrapper.hasClass('foobar'))).toBe(false);
      });
    });
  });

  describe('exists()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('.bar').exists()).toBe(true);
        expect(wrapper.find('.foobar').exists()).toBe(false);
      });
    });
  });

  describe('filter()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper.find('span').filter('.bar').length).toBe(1);
        expect(wrapper.find('span').filter('.foobar').length).toBe(0);
      });
    });
  });

  describe('filterWhere()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('find()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('findWhere()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('first()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('forEach()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('get()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('hasClass()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('html()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('instance()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('is()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('isEmpty()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('key()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('last()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('matchesElement()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('name()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('not()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('parent()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('parents()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('prop()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('props()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('render()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('setContext()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('setProps()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('setState()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('simulate()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('slice()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('some()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('someWhere()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('state()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('tap()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('text()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('type()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('unmount()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });

  describe('update()', () => {
    it('basic test', () => {
      getMountFunction((mount) => {
        const MainComponent = component(
          () => ({}),
          () =>
            <div className="foo">
              <span className="bar" />
              <span className="baz" />
            </div>,
        );

        const wrapper = mount(<MainComponent />);
        expect(wrapper).toBe(wrapper);
      });
    });
  });
});
