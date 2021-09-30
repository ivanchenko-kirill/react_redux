import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deletePost } from '../../api/posts';
import { getPostsLoadingStatus, getPosts } from '../../store';
import { loadPosts } from '../../store/postsReducer';
import { Loader } from '../Loader';
import './PostsList.scss';

interface Props {
  selectedUserId: number;
  selectedPostId: number;
  searchParams: URLSearchParams;
}

export const PostsList: React.FC<Props> = (props) => {
  const {
    selectedUserId,
    selectedPostId,
    searchParams,
  } = props;

  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const isLoading = useSelector(getPostsLoadingStatus);
  const query = searchParams.get('search');
  const history = useHistory();

  useEffect(() => {
    dispatch(loadPosts(selectedUserId));
  }, [dispatch, selectedUserId]);

  const handlePostSelect = (id: number) => {
    if (selectedPostId === id) {
      searchParams.delete('postId');
      history.push({search: searchParams.toString()})
      return;
    }

    searchParams.set('postId', `${id}`)
    history.push({search: searchParams.toString()})
  };

  const handlePostRemove = (id: number) => {
    deletePost(id)
      .then(() => dispatch(loadPosts(selectedUserId)));
  };

  const filteredPosts = useMemo(() => {
    if (query) {
      return posts.filter(post => post.title.includes(query.toLowerCase()));
    } else {
      return posts;
    }
  }, [posts, query]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="PostsList">
      <h2>Posts:</h2>
      {posts.length === 0 && (
        <h3>Selected user has not posted anything yet :(</h3>
      )}

      <ul className="PostsList__list">
        {filteredPosts.map(post => (
          <li className="PostsList__item" key={post.id}>
            <div>
              <b>{`[User #${post.userId}]:`} </b>
              {post.title}
            </div>
            <div className="PostsList__buttons-wrapper">
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handlePostSelect(post.id)}
              >
                {selectedPostId === post.id ? 'Close' : 'Open'}
              </button>
              <button
                type="button"
                className="PostsList__button button"
                onClick={() => handlePostRemove(post.id)}
              >
                Delete
              </button>
            </div>
        </li>
        ))}
      </ul>
    </div>
  )
};
