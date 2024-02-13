export default function ChoresList() {
  return (
    <>
      <h1>Chores List</h1>
    </>
  );
}

// Create a component called ChoresList that lists all of the chores in the system.
// Include the chores' frequencies and difficulties.
// Add a route group in the Routes of the app called /chores for all of the views related to chores. Make the ChoresList the element of the index route of that group.
// The chores should be viewable by all logged in users, but not logged out users.
// Each chore should have a delete button that only admins can see that deletes the chore.
