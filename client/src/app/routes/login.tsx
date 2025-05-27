import { createFileRoute } from '@tanstack/react-router';
import { LoginPage } from '../page/loginPage';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
