import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getArticles } from '../store/articlesSlice';
import ArticleItem from './ArticleItem';

const ArticleList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const status = useSelector((state: RootState) => state.articles.status);

  useEffect(() => {
    // This condition check is to make Article API call only if store is empty.
    if(!articles.length){
      dispatch(getArticles());
    }
  }, [dispatch,articles.length]);

  if (status === 'loading') {
    return <div className='p-20'>Loading...</div>;
  }

  if (status === 'failed') {
    return <div className='p-20'>Error loading articles. Please refresh your browser or try after sometime.</div>;
  }

  return (
    <div className='p-20'>
      <h1>Articles List</h1>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
