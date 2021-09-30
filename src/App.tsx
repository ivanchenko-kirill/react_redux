import React from 'react';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { useLocation } from 'react-router';
import { Filters } from './components/Filters';

const App: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedUserId = searchParams.get('userId') || 0;
  const selectedPostId = searchParams.get('postId') || 0;

  return (
    <div className="App">
      <header className="App__header">
        <Filters
        searchParams={searchParams}
        selectedUserId={+selectedUserId}
        />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            selectedUserId={+selectedUserId}
            selectedPostId={+selectedPostId}
            searchParams={searchParams}
          />
        </div>

        {selectedPostId > 0 && (
          <div className="App__content">
          <PostDetails selectedPostId={+selectedPostId}/>
        </div>
        )}
      </main>
    </div>
  )
}

export default App;
