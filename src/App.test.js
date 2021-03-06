import { mount } from 'enzyme';
import App from './App';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('should render correctly', () => {
    const wrapper = mount(<App />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
