import { useDispatch } from "react-redux";
import { login } from "../actions";

const LoginBtn = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login()); // Ensure you are calling the action creator
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default LoginBtn;
