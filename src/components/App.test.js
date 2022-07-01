import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from './App';

test('Render App component', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

  const bannerElement = screen.getByText(/A place to share your knowledge./i);
  expect(bannerElement).toBeInTheDocument();
});

test('Render 2 loading states while articles and tags are not loaded yet', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

  const loadingState = screen.getAllByText(/Loading/);
  expect(loadingState.length).toEqual(2);
});
