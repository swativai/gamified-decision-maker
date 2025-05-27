import { createFileRoute } from '@tanstack/react-router';
import { JoinRoom } from '../../../page/joinRoom';

export const Route = createFileRoute('/joinRoom/$roomCode')({
  component: JoinRoom,
});
