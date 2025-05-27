import { createFileRoute } from '@tanstack/react-router';
import { JoinRoomWithCode } from '../../page/joinRoomWithCode';

export const Route = createFileRoute('/joinRoom')({
  component: JoinRoomWithCode,
});
