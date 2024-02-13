/* eslint-disable react/prop-types */
import { Route, Routes } from 'react-router-dom';
import { AuthorizedRoute } from './auth/AuthorizedRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Home';
import UserProfileList from './UserProfileList';
import UserProfileDetails from './UserProfileDetails';
import ChoresList from './ChoresList';

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home user={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route
          path="userprofiles"
          element={
            <AuthorizedRoute roles={['Admin']} loggedInUser={loggedInUser}>
              <UserProfileList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="userprofiles/:id"
          element={
            <AuthorizedRoute roles={['Admin']} loggedInUser={loggedInUser}>
              <UserProfileDetails />
            </AuthorizedRoute>
          }
        />
        <Route
          path="chores"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <ChoresList />
            </AuthorizedRoute>
          }
        />
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
