import axios from 'axios';
import { client } from '.';
import { MainResponse, UserLogin, UserResponse } from '../../types';

export const signInRequest = async (data: UserLogin) => {
  try {
    const response = await client.post<MainResponse>('/signin', data, {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error?.response?.data?.error?.message
        : 'Um erro inesperado aconteceu.'
    );
  }
};

export const signOutRequest = async (id: string) => {
  try {
    const response = await client.post<MainResponse>('/signout', { id });
    return response.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error)
        ? error?.response?.data?.error?.message
        : 'Um erro inesperado aconteceu.'
    );
  }
};

export const getMe = async () => {
  try {
    const response = await client.get<UserResponse>('/user/me');
    return response.data;
  } catch (error) {
    return axios.isAxiosError(error)
      ? error?.response?.data?.error?.message
      : 'Um erro inesperado aconteceu.';
  }
};

// async function createUser() {
//   try {
//     // 👇️ const data: CreateUserResponse
//     const { data } = await axios.post<CreateUserResponse>(
//       'https://reqres.in/api/users',
//       { name: 'John Smith', job: 'manager' },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       }
//     );

//     console.log(JSON.stringify(data, null, 4));

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       // 👇️ error: AxiosError<any, any>
//       return error.message;
//     } else {
//       console.log('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// }
