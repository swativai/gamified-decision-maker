import { createFileRoute } from '@tanstack/react-router';
import { ShowRoomsDetails } from '../page/showRoomsDetails';

export const Route = createFileRoute('/roomsDetails')({
  component: ShowRoomsDetails,
});
