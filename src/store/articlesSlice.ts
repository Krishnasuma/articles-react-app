import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles, fetchArticleById } from '../api/articles';

interface Article {
  id: string;
  title: string;
  summary: string;
  fullText?: string;
}

interface ArticlesState {
  articles: Article[];
  selectedArticle?: Article;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ArticlesState = {
  articles: [],
  status: 'idle',
};

export const getArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const articles = await fetchArticles();
  return articles;
});

export const getArticle = createAsyncThunk('articles/fetchArticle', async (id: string) => {
  const article = await fetchArticleById(id);
  return article;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'idle';
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.selectedArticle = action.payload;
      });
  },
});

export default articlesSlice.reducer;
