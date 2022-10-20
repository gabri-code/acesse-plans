import { getApiClient } from './axios';
import { signInRequest, getMe, signOutRequest } from './User';

export const client = getApiClient();

export { signInRequest, getMe, signOutRequest };
