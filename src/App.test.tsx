import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import watcher from './store/saga';
import App from './App';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

describe('App', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render correctly and match with snapshot', () => {
    const initialState = {
      board: {
        isLoading: false,
        map: [],
        status: '',
      },
    };
    const store = mockStore(initialState);

    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should include title, start button, and start guide at first render', () => {
    const initialState = {
      board: {
        isLoading: false,
        map: [],
        status: '',
      },
    };

    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(wrapper.text().includes('Minesweeper')).toBe(true);
    expect(wrapper.text().includes('Click START button to start new game!')).toBe(true);
    expect(wrapper.text().includes('Start')).toBe(true);
  });

  it('should disable start button when loading new game', async () => {
    const initialState = {
      board: {
        isLoading: true,
        map: [],
        status: '',
      },
    };
    const store = mockStore(initialState);
    sagaMiddleware.run(watcher);

    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(wrapper.getByText('Start')).toBeDisabled();
  });

  it('should include playing message after render board', async () => {
    const initialState = {
      board: {
        isLoading: false,
        map: [
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
        ],
        status: 'OK',
      },
    };

    const store = mockStore(initialState);
    sagaMiddleware.run(watcher);

    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(wrapper.text().includes('Playing')).toBe(true);
  });
});
