import { createFileRoute, useParams } from '@tanstack/react-router';
import { Room } from '../../../page/room';

export const Route = createFileRoute('/room/$roomId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { roomId } = useParams({ from: '/room/$roomId' });
  return <Room roomId={roomId} />;
}
