import { Dispatch, AnyAction } from 'redux';
import { getPostComments } from '../api/comments';

export interface RootState {
  comments: Comment[];
  isCommentsHidden: boolean;
}

const initialState: RootState = {
  comments: [],
  isCommentsHidden: false,
};

const SET_COMMENTS = 'SET_COMMENTS';
const SET_COMMENTS_HIDDEN = 'SET_COMMENTS_HIDDEN';

export const setComments = (comments: Comment[]) => ({
  type: SET_COMMENTS,
  payload: comments,
});

export const setCommentsHidden = (value: boolean) => ({
  type: SET_COMMENTS_HIDDEN,
  payload: value,
});

export const loadComments = (postId: number) => {
  return async (dispatch: Dispatch) => {
    const comments = await getPostComments(postId);
    dispatch(setComments(comments));
  };
};

export const commentsSelectors = {
  getComments: (comments: Comment[]) => comments,
  getIsCommentsHidden: (value: boolean) => value,
};

export const commentsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case SET_COMMENTS_HIDDEN:
      return {
        ...state,
        isCommentsHidden: action.payload,
      };

    default:
      return state;
  };
};
