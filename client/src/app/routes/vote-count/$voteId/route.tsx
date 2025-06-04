import { createFileRoute } from '@tanstack/react-router';
import { VotingRoom } from '../../../page/vottingRoom';

export const Route = createFileRoute('/vote-count/$voteId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { voteId } = Route.useParams();

  // TODO: Replace 'yourRoomId' with the actual roomId value as needed
  return (
    <div>
      <VotingRoom roomId='yourRoomId' voteId={voteId} />
    </div>
  );
}
