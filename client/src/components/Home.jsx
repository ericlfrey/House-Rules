import PropTypes from 'prop-types';

export default function Home({ user }) {
  console.log(user);
  return (
    <>
      <h1>Welcome, {`${user.firstName} ${user.lastName}`}</h1>
    </>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
};
