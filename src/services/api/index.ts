import { getApiClient } from './axios';
import { signInRequest, getMe } from './User';

export const client = getApiClient();

export { signInRequest, getMe };
