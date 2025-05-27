import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '../page/homePage';

export const Route = createFileRoute('/')({
  component: HomePage,
});
