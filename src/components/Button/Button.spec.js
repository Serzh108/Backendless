import { mount } from 'enzyme';
import Button from './Button';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Button />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
