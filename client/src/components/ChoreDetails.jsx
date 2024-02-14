import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChoreById } from '../managers/choreManager';
import { Table } from 'reactstrap';

export default function ChoreDetails() {
  const [chore, setChore] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getChoreById(id).then(setChore);
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
      <h5>Current Assignees:</h5>
      {chore.completions?.map(c => (
        <p key={c.id}>
          {c.userProfile.firstName} {c.userProfile.lastName}
        </p>
      ))}
    </>
  );
}
