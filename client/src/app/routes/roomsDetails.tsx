import { createFileRoute } from '@tanstack/react-router';
// import { ShowRoomsDetails } from '../page/showRoomsDetails';
import { Room } from '../page/room';

export const Route = createFileRoute('/roomsDetails')({
  component: Room,
});
