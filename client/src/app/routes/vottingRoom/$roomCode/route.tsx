import { createFileRoute } from '@tanstack/react-router';
import { VotingRoom } from '../../../page/vottingRoom';

export const Route = createFileRoute('/vottingRoom/$roomCode')({
  component: RouteComponent,
});

function RouteComponent() {
  const { roomCode } = Route.useParams();
  return (
    <div>
      <VotingRoom roomId={roomCode} />
    </div>
  );
}
