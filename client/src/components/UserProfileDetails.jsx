import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../managers/userProfileManager';
import { Table } from 'reactstrap';

export default function UserProfileDetails() {
  const [userDetails, setUserDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getUserById(id).then(setUserDetails);
  }, [id]);
  return (
    <>
      <h1>
        {userDetails.firstName} {userDetails.lastName}
      </h1>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Address</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{`${userDetails.firstName} ${userDetails.lastName}`}</th>
            <td>{userDetails.userName || 'username not set'}</td>
            <td>{userDetails.address}</td>
            <td>{userDetails.email || 'email not set'}</td>
          </tr>
        </tbody>
      </Table>
      <h2>Assigned Chores</h2>
      <Table>
        <thead>
          <tr>
            <th>Chore</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.choreAssignments?.map(ca => (
            <tr key={ca.id}>
              <td>{ca.chore.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Completed Chores</h2>
      <Table>
        <thead>
          <tr>
            <th>Chore</th>
            <th>Completion Date</th>
          </tr>
        </thead>
        <tbody>
          {userDetails.choreCompletions?.map(ca => (
            <tr key={ca.id}>
              <td>{ca.chore.name}</td>
              <td>{new Date(ca.completedOn).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
