import { mount } from 'enzyme';
import Device from './Device';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('Device', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Device />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
