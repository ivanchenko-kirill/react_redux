import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getUsers } from "../../store";
import { loadUsers } from "../../store/usersReducer";
import debounce from 'lodash/debounce';

interface Props {
  searchParams: URLSearchParams;
  selectedUserId: number;
}

export const Filters: React.FC<Props> = (props) => {
  const { searchParams, selectedUserId } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(getUsers);
  const appliedQuery = searchParams.get('search') || '';
  const [query, setQuery] = useState(appliedQuery);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch, users]);

  const handleUserSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const value = target.value;
    if (+value > 0) {
      searchParams.set('userId',value);
    } else {
      searchParams.delete('userId');
    }

    history.push({ search: searchParams.toString() });
  };

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
    if (newQuery.trim().length > 0) {
      searchParams.set('search', newQuery);
    } else {
      searchParams.delete('search');
    }

    history.push({ search: searchParams.toString() })
    }, 500),
    []
  );

  const handleSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    applyQuery(target.value);
  }

  return (
    <>
      <label>
        Select a user: &nbsp;

        <select
          className="App__user-selector"
          onChange={handleUserSelect}
          value={selectedUserId}
        >
          <option value={0}>All users</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Search by title: &nbsp;
        <input
          className="App__search"
          type="text"
          value={query}
          onChange={handleSearch}
        />
      </label>
    </>
  );
}
