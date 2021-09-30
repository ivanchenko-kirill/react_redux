import { Dispatch, AnyAction } from 'redux'
import { getUsersFromServer } from '../api/users';

export interface RootState {
  users: User[];
}

const initialState: RootState = {
  users: [],
}

const SET_USERS = 'SET_USERS';

export const setUsers = (users: User[]) => ({
  type: SET_USERS,
  payload: users,
});

export const loadUsers = () => (
  async (dispatch: Dispatch) => {
    const users = await getUsersFromServer();
    dispatch(setUsers(users));
  }
);

export const usersSelectors = {
  getUsers: (users: User[]) => users,
}

export const usersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
}
