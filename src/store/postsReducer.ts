import { Dispatch, AnyAction } from 'redux';
import { getAllPosts, getPostDetails, getUserPosts } from '../api/posts';

export interface RootState {
  posts: Post[];
  selectedPost: Post | null;
  isPostsLoading: boolean;
  isDetailsLoading: boolean;
}

const initialState: RootState = {
  posts: [],
  selectedPost: null,
  isPostsLoading: true,
  isDetailsLoading: true,
}

const SET_POSTS = 'SET_POSTS';
const SET_SELECTED_POST = 'SET_SELECTED_POST';
const SET_POSTS_IS_LOADING = 'SET_POSTS_IS_LOADING';
const SET_DETAILS_IS_LOADING = 'SET_DETAILS_IS_LOADING';

export const setPosts = (posts: Post[]) => ({
  type: SET_POSTS,
  payload: posts,
});

export const setSelectedPost = (post: Post) => ({
  type: SET_SELECTED_POST,
  payload: post,
});

export const setPostsLoadingStatus = (status: boolean) => ({
  type: SET_POSTS_IS_LOADING,
  payload: status,
});

export const setDetailsLoadingStatus = (status: boolean) => ({
  type: SET_DETAILS_IS_LOADING,
  payload: status,
})

export const loadPosts = (userId: number) => {
  if (!userId) {
    return async (dispatch: Dispatch) => {
      dispatch(setPostsLoadingStatus(true));
      const posts = await getAllPosts();
      dispatch(setPosts(posts));
      dispatch(setPostsLoadingStatus(false));
    }
  }

  return async (dispatch: Dispatch) => {
    dispatch(setPostsLoadingStatus(true));
    const posts = await getUserPosts(userId);
    dispatch(setPosts(posts));
    dispatch(setPostsLoadingStatus(false));
  }
}

export const loadPostDetails = (postId: number) => (
  async (dispatch: Dispatch) => {
    dispatch(setDetailsLoadingStatus(true));
    const post = await getPostDetails(postId);
    dispatch(setSelectedPost(post));
    dispatch(setDetailsLoadingStatus(false));
  }
);

export const postsSelectors = {
  getPosts: (posts: Post[]) => posts,
  getSelectedPost: (post: Post | null) => post,
  getPostsStatus: (status: boolean) => status,
  getDetailsStatus: (status: boolean) => status,
}

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      };

    case SET_POSTS_IS_LOADING:
      return {
        ...state,
        isPostsLoading: action.payload,
      };

    case SET_DETAILS_IS_LOADING:
      return {
        ...state,
        isDetailsLoading: action.payload,
      };

    default:
      return state;
  }
}
