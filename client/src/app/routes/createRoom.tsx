import { createFileRoute } from '@tanstack/react-router';
import { CreateNewRoom } from '../page/createNewRoom';

export const Route = createFileRoute('/createRoom')({
  component: CreateNewRoom,
});
