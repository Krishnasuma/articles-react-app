import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleProps {
  article: {
    id: string;
    title: string;
    summary: string;
  };
}

const ArticleItem: React.FC<ArticleProps> = ({ article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.summary}</p>
      <button><Link to={`/articles/${article.id}`}>Read more</Link></button>
    </div>
  );
};

export default ArticleItem;
