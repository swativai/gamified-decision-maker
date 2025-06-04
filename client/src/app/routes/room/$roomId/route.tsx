import { createFileRoute } from '@tanstack/react-router';

import { CreateVotingPage } from '../../../page/createVotingPage';

export const Route = createFileRoute('/room/$roomId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { roomId } = Route.useParams();
  // return <Room roomId={roomId} />;
  return <CreateVotingPage roomId={roomId} />; // Assuming CreateVotingPage accepts roomId as a prop
}
