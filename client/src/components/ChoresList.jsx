import { useEffect, useState } from 'react';
import { getChores } from '../managers/choreManager';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function ChoresList() {
  const [chores, setChores] = useState([]);

  useEffect(() => {
    getChores().then(setChores);
  }, []);
  return (
    <>
      <h1>Chores List</h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Frequency</th>
            <th>Difficulty</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chores.map(c => (
            <tr key={c.id}>
              <th scope="row">{`${c.name}`}</th>
              <th scope="row">{`${c.choreFrequencyDays}`}</th>
              <th scope="row">{`${c.difficulty}`}</th>
              <td>
                <Link to={`/chores/${c.id}`}>Details</Link>
              </td>
              <td>
                {/* {up.roles.includes('Admin') ? (
                  <Button
                    color="danger"
                    onClick={() => {
                      demote(up.identityUserId);
                    }}
                  >
                    Demote
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={() => {
                      promote(up.identityUserId);
                    }}
                  >
                    Promote
                  </Button>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
