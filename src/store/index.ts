import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { commentsReducer, commentsSelectors } from './commentsReducer';
import { postsReducer, postsSelectors } from './postsReducer';
import { usersReducer, usersSelectors } from './usersReducer';

type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export const getPostsLoadingStatus = (state: RootState) => {
  return postsSelectors.getPostsStatus(state.posts.isPostsLoading);
}

export const getDetailsLoadingStatus = (state: RootState) => {
  return postsSelectors.getDetailsStatus(state.posts.isDetailsLoading);
}

export const getUsers = (state: RootState) => {
  return usersSelectors.getUsers(state.users.users);
};

export const getPosts = (state: RootState) => {
  return postsSelectors.getPosts(state.posts.posts);
};

export const getSelectedPost = (state: RootState) => {
  return postsSelectors.getSelectedPost(state.posts.selectedPost);
};

export const getComments = (state: RootState) => {
  return commentsSelectors.getComments(state.comments.comments);
};

export const getCommentsIsHidden = (state: RootState) => {
  return commentsSelectors.getIsCommentsHidden(state.comments.isCommentsHidden);
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
