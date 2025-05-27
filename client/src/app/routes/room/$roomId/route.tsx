import { createFileRoute } from '@tanstack/react-router';
import { Room } from '../../../page/room';

export const Route = createFileRoute('/room/$roomId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { roomId } = Route.useParams();
  return <Room roomId={roomId} />;
}
