import PropTypes from "prop-types";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../logo.svg";
import { RootState } from "../redux/store";

const Header: FC<{ onLogout: Function }> = ({ onLogout }) => {
  const { loggedIn } = useSelector((state: RootState) => state.users0);

  return (
    <div className="d-flex w-100 h-100 px-5 py-2 mx-auto flex-column bg-info mb-4">
      <header className="mb-auto">
        <div>
          <h3 className="float-md-start mb-0">
            <img src={logo} className="App-logo" alt="logo" />
            Country Look
          </h3>
          <nav className="nav nav-masthead justify-content-center float-md-end">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
            <NavLink
              exact
              to="/faqs"
              className="nav-link"
              activeClassName="active"
            >
              FAQs
            </NavLink>
            {loggedIn ? (
              <Link to="/" className="nav-link" onClick={() => onLogout()}>
                Sign Out
              </Link>
            ) : (
              <NavLink
                exact
                to="/login"
                className="nav-link"
                activeClassName="active"
              >
                Sign In
              </NavLink>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

Header.defaultProps = {
  onLogout: () => ({}),
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
