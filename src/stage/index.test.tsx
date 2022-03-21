import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { cleanup } from '@testing-library/react';

import Board from './index';

describe('Stage', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correctly and match with snapshot', () => {
    const map: string[] = [];
    const tree = renderer.create(<Board map={map} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should be able to find at least 1 square cell', () => {
    const map: string[] = [
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
      '□□□□□□□□□□',
    ];
    const wrapper = mount(<Board map={map} />);
    const element = wrapper.find({ 'data-testid': 'cell-1-1' });

    expect(element).toBeTruthy();
  });
});
