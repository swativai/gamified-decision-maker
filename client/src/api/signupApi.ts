import { baseAPI, TAGS } from '../stores/base-api';
interface UserForm {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export const userSignupApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    userSignup: build.mutation<unknown, UserForm>({
      invalidatesTags: [TAGS.USER],
      query: (newUser) => ({
        url: '/register',
        method: 'POST',
        body: newUser,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useUserSignupMutation } = userSignupApi;
