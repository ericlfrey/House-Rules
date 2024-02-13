import { useEffect, useState } from 'react';
import { deleteChore, getChores } from '../managers/choreManager';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { tryGetLoggedInUser } from '../managers/authManager';

export default function ChoresList() {
  const [chores, setChores] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState();

  const getAllChores = () => getChores().then(setChores);

  useEffect(() => {
    getAllChores();
    tryGetLoggedInUser().then(user => setLoggedInUser(user));
  }, []);

  const handleDelete = id => {
    deleteChore(id).then(() => getAllChores());
  };

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
                {loggedInUser?.roles.includes('Admin') ? (
                  <Button color="danger" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
