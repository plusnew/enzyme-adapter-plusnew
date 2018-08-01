import { shallow } from 'enzyme';
import plusnew, { PlusnewAbstractElement, Plusnew } from 'plusnew';
import { PlusnewElement } from 'plusnew/dist/src/PlusnewAbstractElement';
import PlusnewShallowWrapper from './wrapper/PlusnewShallowWrapper';

type ShallowRendererProps = {};

const plusnewShallow = function (node: plusnew.JSX.Element, options?: ShallowRendererProps) {
  const wrapper = shallow(node as any, options);

  return new PlusnewShallowWrapper(wrapper);
};

export default plusnewShallow;

export { ShallowRendererProps };
