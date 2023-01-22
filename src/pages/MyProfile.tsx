import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

const MyProfile = () => {
  const user = useAppSelector((state) => state.userReducer);
  return (
    <div className="profile">
      {user.currentUser.id != 0 ? (
        <div className="profile_logged">
          <h1>My profile</h1>
          <p>Here is your profile information:</p>
        </div>
      ) : (
        <div>
          <h1>You are not logged in</h1>
          <p>Please log in to see your information.</p>
          <p>
            If you have not yet registered an account, you can do it{" "}
            <Link to="../register">here</Link>.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
