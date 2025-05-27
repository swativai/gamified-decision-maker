import { createFileRoute } from '@tanstack/react-router';

import { DashBord } from '../page/dashbord';
// import { Room } from '../page/room';

export const Route = createFileRoute('/home')({
  component: DashBord,
});
