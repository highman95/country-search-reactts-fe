import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Alert from "./components/Alert";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Search from "./pages/Search";
import * as alert from "./redux/alert/action";
import * as user from "./redux/user/action";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const alerts0 = useAppSelector((state) => state.alerts0);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(alert.clear()); // clear notifications
    dispatch(user.logout());
  };

  useEffect(() => {
    dispatch(alert.clear()); // clear alert on location change
  }, [dispatch]);

  return (
    <>
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Router>
          <Header onLogout={handleLogout} />

          <div className="App-header">
            <div className="container">
              <div className="row">
                <Alert content={alerts0} />

                <Switch>
                  {/* <PrivateRoute exact path="/" component={Search} /> */}
                  <PrivateRoute exact path="/">
                    <Search />
                  </PrivateRoute>
                  <Route path="/login" component={Login} />
                  <Redirect from="*" to="/" />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </div>

      <footer className="mt-auto text-white-50 text-start px-5 py-2 border-top border-info">
        <p>
          Country Look with{" "}
          <a href="https://getbootstrap.com/" className="text-white">
            Bootstrap
          </a>
          . &copy; 2021. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default App;
