import { useParams } from 'react-router-dom';

export default function ChoreDetails() {
  const { id } = useParams();
  return (
    <>
      <h1>Chore Details Page {id}</h1>
    </>
  );
}

// Create a component called ChoreDetails that shows the details for a chore
// along with a list of the current assignees and the most recent completion.
// This component should be viewable only by admins.
// Add "Details" links to the ChoresList items,
// but conditionally render them based on whether the loggedInUser is an Admin (you will have already created the logic to do this for the delete button).
