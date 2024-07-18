import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getArticle } from '../store/articlesSlice';
import { RootState, AppDispatch } from '../store/store';
import { useNavigate } from "react-router-dom";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const article = useSelector((state: RootState) => state.articles.selectedArticle);
  const navigate = useNavigate();

  useEffect(() => {
    // This condition is to call API only if user clicks on different article, or else loads from redux store
    if (id && article?.id !== id) {
      dispatch(getArticle(id));
    }
  }, [dispatch, id, article?.id]);

  if (!article || article?.id !== id) {
    return <div className='p-20'>Loading...</div>;
  }
  return (
    <div className='p-20'>
      <h2>{article.title}</h2>
      <p>{article.fullText}</p>
      <button onClick={() => navigate(-1)}>Back to list page</button>
    </div>
  );
};

export default ArticleDetail;
