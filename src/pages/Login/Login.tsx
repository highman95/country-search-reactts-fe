import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { Redirect, useLocation } from "react-router-dom";
import { authenticate, logout } from "../../redux/user/action";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import "./Login.css";

type LocationState = {
  from: {
    pathname: string;
  };
};

const Login: FC<{}> = () => {
  const [{ username, password }, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { loggingIn, loggedIn = false } = useAppSelector(
    (state) => state.users0
  );
  const dispatch = useAppDispatch();
  const location = useLocation<LocationState>();

  useEffect(() => {
    dispatch(logout()); // reset login status
  }, [dispatch]);

  useEffect(() => {
    setSubmitted(false);
  }, [loggingIn]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setCredentials((credentials) => ({
      ...credentials,
      [name]: value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      dispatch(authenticate(username, password));
    }
  };

  if (loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect /* push */ to={from} />;
  }

  return (
    <div className="col-lg-4 offset-lg-8 mt-5">
      {/* <h2>Login</h2> */}

      <main className="form-signin">
        <form name="form" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="email"
              id="floating-username"
              className={`form-control ${
                submitted && !username ? "is-invalid" : ""
              }`}
              name="username"
              value={username}
              onChange={handleChange}
              disabled={loggingIn}
              placeholder="john.doe@example.com"
            />
            <label htmlFor="floating-username" className="text-dark">
              Username
            </label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              id="floating-password"
              className={`form-control ${
                submitted && !password ? "is-invalid" : ""
              }`}
              name="password"
              value={password}
              onChange={handleChange}
              disabled={loggingIn}
              placeholder="Password"
            />
            <label htmlFor="floating-password" className="text-dark">
              Password
            </label>
          </div>

          <div className="checkbox mb-3 text-end">
            <label style={{ cursor: "pointer" }}>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>

          <button className="w-100 btn btn-lg btn-info" type="submit">
            {loggingIn && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Sign in
          </button>
        </form>
      </main>

      {/* <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className={'form-control' + (submitted && !username ? ' is-invalid' : '')}
          />
          {submitted && !username &&
            <div className="invalid-feedback">Username is required</div>
          }
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={'form-control' + (submitted && !password ? ' is-invalid' : '')}
          />
          {submitted && !password &&
            <div className="invalid-feedback">Password is required</div>
          }
        </div>
        <div className="form-group">
          <button className="btn btn-primary">
            {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Login
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default Login;
