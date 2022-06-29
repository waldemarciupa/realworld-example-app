import React, { SyntheticEvent } from 'react';
import agent from '../../agent';

interface Result {
  articles: [];
  articlesCount: number;
}

interface TagsProps {
  tags: string[];
  onClickTag: (tag: string, page: (page: number) => void, payload: Promise<Result>) => void;
}

const Tags = ({ tags, onClickTag }: TagsProps) => {
  if (tags) {
    return (
      <div className='tag-list'>
        {tags.map((tag) => {
          const handleClick = (ev: SyntheticEvent) => {
            ev.preventDefault();
            onClickTag(
              tag,
              (page: number) => {
                agent.Articles.byTag(tag, page);
              },
              agent.Articles.byTag(tag),
            );
          };

          return (
            <button type='button' className='tag-default tag-pill' key={tag} onClick={handleClick}>
              {tag}
            </button>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading Tags...</div>;
  }
};

export default Tags;
