import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  assignChore,
  getChoreById,
  unassignChore,
} from '../managers/choreManager';
import { Table } from 'reactstrap';
import { getUserProfiles } from '../managers/userProfileManager';

export default function ChoreDetails() {
  const [chore, setChore] = useState({});
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const getCurrentChore = () => getChoreById(id).then(setChore);

  useEffect(() => {
    getCurrentChore();
    getUserProfiles().then(setUsers);
  }, [id]);

  const mostRecentCompletionDate = () => {
    if (chore?.completions?.length) {
      const mostRecent = chore.completions[chore.completions.length - 1];
      const mostRecentDate = new Date(
        mostRecent.completedOn
      ).toLocaleDateString();
      return mostRecentDate;
    }
  };

  const handleAssign = (e, userId) => {
    const payload = {
      userId,
      choreId: chore.id,
    };

    if (e.target.checked) {
      assignChore(payload).then(() => getCurrentChore());
    }
    if (!e.target.checked) {
      unassignChore(payload).then(() => getCurrentChore());
    }
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Frequency (days)</th>
            <th>Difficulty (1 - 5)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{chore.name}</th>
            <td>{chore.choreFrequencyDays}</td>
            <td>{chore.difficulty}</td>
          </tr>
        </tbody>
      </Table>
      <h5>Most Recent Completion - {mostRecentCompletionDate()}</h5>
      <h5>Assign Chore:</h5>
      {users.map(u => (
        <div key={u.id} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id={`check--${u.id}`}
            type="checkbox"
            style={{ marginRight: '2rem' }}
            value={u.id}
            checked={
              chore?.assignments?.some(a => a.userProfileId === u.id) || false
            }
            onChange={e => handleAssign(e, u.id)}
          />
          <label htmlFor={`check--${u.id}`}>
            {u.firstName} {u.lastName}
          </label>
        </div>
      ))}
    </>
  );
}

// Let's enhance the Chore Details page so that an admin can assign a chore to different users.

// Feature requirement
// The Chore Details page no longer needs to display a list of currently assigned users
// Instead, the component should display a list of the names of all the users with checkboxes to the left of their names
// If a user is currently assigned to the chore, that user's checkbox should be checked when the component displays.
// When an admin user clicks on a checkbox:
// If the box is getting checked, the database should be updated to assign the chore to the user
// If the box is getting unchecked, the database should updated so that the user is not assigned to the chore.
// In either case, after the response to the assignment request comes back from the API, the component should re-fetch the chore to update the current assignments for that chore.
// Implementing the Feature
// Some helpful tips for implementing this feature:

// The state of the ChoreDetails component will need to include all users in addition to the chore data.
// Use the checked prop on the checkbox input elements to set the checked state for each one. The checkbox should be checked if the corresponding user's id matches the userProfileId property of any of the chore's choreAssignments.
// You can store the user id for each checkbox in the value prop of the input so that you can retrieve it later in the handler.
// Create a handler function for the checkbox elements that, onChange:
// Checks to see if the box is getting checked or unchecked
// Gets the user id associated with that checkbox, and then either:
// Assigns the chore to that user or
// unassigns that chore
// Finally, re-fetch the chore with its assignments from the database to update the state.
