import { createFileRoute } from '@tanstack/react-router';
import { SignupPage } from '../page/signupPage';

export const Route = createFileRoute('/signup')({
  component: SignupPage,
});
