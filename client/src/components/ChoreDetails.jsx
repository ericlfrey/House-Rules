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
