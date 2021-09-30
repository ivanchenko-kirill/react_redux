import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnServer, deleteCommentFromServer } from '../../api/comments';
import {
  getComments,
  getCommentsIsHidden,
  getDetailsLoadingStatus,
  getSelectedPost,
} from '../../store';
import { loadComments, setCommentsHidden } from '../../store/commentsReducer';
import { loadPostDetails } from '../../store/postsReducer';
import { Loader } from '../Loader';
import { NewCommentForm } from '../NewCommentForm';
import './PostDetails.scss';

interface Props {
  selectedPostId: number;
}

export const PostDetails: React.FC<Props> = ({ selectedPostId }) => {
  const dispatch = useDispatch();
  const selectedPost = useSelector(getSelectedPost);
  const comments = useSelector(getComments);
  const loadingStatus = useSelector(getDetailsLoadingStatus);
  const isCommentsHidden = useSelector(getCommentsIsHidden);

  useEffect(() => {
    dispatch(loadPostDetails(selectedPostId));
    dispatch(loadComments(selectedPostId))
  }, [selectedPostId, dispatch]);

  const handleCommentsHide = () => {
    dispatch(setCommentsHidden(!isCommentsHidden));
  };

  const removeComment = (commentId: number) => {
    deleteCommentFromServer(commentId)
      .then(() => dispatch(loadComments(selectedPostId)));
  };

  const addComment = (newComment: Partial<Comment>) => {
    addCommentOnServer(newComment)
      .then(() => dispatch(loadComments(selectedPostId)));
  }

  return (
    !loadingStatus ? (
      <div className="PostDetails">
        <h2>Post details:</h2>

        <section className="PostDetails__post">
          <p>{selectedPost?.body}</p>
        </section>

        {comments.length > 0 && (
          <section className="PostDetails__comments">
            <button
              type="button"
              className="button"
              onClick={handleCommentsHide}
            >
              {isCommentsHidden
                ? `Show ${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`
                : `Hide ${comments.length} ${comments.length === 1 ? 'comment' : 'comments'}`}
            </button>

            {!isCommentsHidden && (
              <ul className="PostDetails__list">
                {comments.map(comment => (
                  <li key={comment.id} className="PostDetails__list-item">
                    <button
                      type="button"
                      className="PostDetails__remove-button button"
                      onClick={() => removeComment(comment.id)}
                    >
                      X
                    </button>
                    <p>{comment.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        <section>
          <div className="PostDetails__form-wrapper">
            <NewCommentForm
              selectedPostId={selectedPostId}
              onAdd={addComment}
            />
          </div>
        </section>
      </div>
    ) : (
      <Loader />
    )
  );
};
