import { baseAPI, TAGS } from '../stores/base-api';
interface UserForm {
  password: string;
  email: string;
}

interface LoginResponse {
  msg: string;
  token: string;
  userId: string;
}

export const loginUserApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation<LoginResponse, UserForm>({
      invalidatesTags: [TAGS.USER],
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginUserApi;
