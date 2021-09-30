import { request } from "./api"

export const getUsersFromServer = (): Promise<User[]> => {
  return request('/users');
}
