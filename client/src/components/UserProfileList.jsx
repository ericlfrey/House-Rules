import { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
// import { Link } from 'react-router-dom';
import { getUserProfiles } from '../managers/userProfileManager';
import { Link } from 'react-router-dom';

export default function UserProfileList() {
  const [userProfiles, setUserProfiles] = useState([]);

  const getProfilesWithRoles = () => {
    getUserProfiles().then(setUserProfiles);
  };

  useEffect(() => {
    getProfilesWithRoles();
  }, []);

  return (
    <>
      <h2>User Profiles</h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userProfiles.map(up => (
            <tr key={up.id}>
              <th scope="row">{`${up.firstName} ${up.lastName}`}</th>
              <td>
                <Link to={`/userprofiles/${up.id}`}>Details</Link>
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
