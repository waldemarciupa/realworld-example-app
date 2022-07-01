import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  favorite: (slug: string) =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug),
    }),
  unfavorite: (slug: string) =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug),
    }),
});

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

interface ArticleProps {
  article: Article;
  favorite: (slug: string) => void;
  unfavorite: (slug: string) => void;
}

const Article = ({ article, favorite, unfavorite }: ArticleProps) => {
  const favoriteButtonClass = article?.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  return (
    <div className='article-preview'>
      <div className='article-meta'>
        <Link to={`/@${article.author.username}`}>
          <img
            src={
              article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
            }
            alt={article.author.username}
          />
        </Link>

        <div className='info'>
          <Link className='author' to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className='date'>{new Date(article.createdAt).toDateString()}</span>
        </div>

        <div className='pull-xs-right'>
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className='ion-heart' /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className='preview-link'>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className='tag-list'>
          {article.tagList.map((tag) => {
            return (
              <li className='tag-default tag-pill tag-outline' key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

const ArticlePreview = React.memo(Article);

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
