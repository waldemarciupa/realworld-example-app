import '@testing-library/jest-dom';
import { getByText, render, screen } from '@testing-library/react';
import ArticlePreview from './ArticlePreview';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Article', () => {
  const article = {
    slug: 'Welcome-to-RealWorld-project-1',
    title: 'Welcome to RealWorld project',
    description:
      'Exemplary fullstack Medium.com clone powered by React, Angular, Node, Django, and many more',
    body: 'See how the exact same Medium.com clone (called Conduit) is built using different frontends and backends. Yes, you can mix and match them, because they all adhere to the same API spec',
    tagList: ['welcome', 'introduction'],
    createdAt: '2021-11-24T12:11:07.557Z',
    updatedAt: '2021-11-24T12:11:07.557Z',
    favorited: false,
    favoritesCount: 1202,
    author: {
      username: 'Gerome',
      bio: null,
      image: 'https://api.realworld.io/images/demo-avatar.png',
      following: false,
    },
  };

  it('should render an article with article prop', () => {
    // debug console rendered component
    const { debug, container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ArticlePreview article={article} />
        </BrowserRouter>
      </Provider>,
    );
    debug();
    expect(getByText(container, 'Welcome to RealWorld project')).toBeInTheDocument();
  });

  it('should be a link that have href to username', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ArticlePreview article={article} />
        </BrowserRouter>
      </Provider>,
    );
    const link = screen.getByText(article.author.username);
    expect(link.getAttribute('href')).toBe(`/@${article.author.username}`);
  });

  it('should be a link that have href to a single article', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ArticlePreview article={article} />
        </BrowserRouter>
      </Provider>,
    );
    const link = container.querySelector('.preview-link');
    expect(link.getAttribute('href')).toBe(`/article/${article.slug}`);
  });
});
