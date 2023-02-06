import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/linkedin-logo-png-2051.png";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";

export const PrivateHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark d-flex align-items-center">
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="" />
      </Link>
      <button
        type="button"
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        id="navbarCollapse"
        className="collapse navbar-collapse justify-content-start"
      >
        <form className="navbar-form form-inline">
          <div className="input-group search-box d-flex align-items-center">
            <Link className="text-light text-decoration-none me-3" to="/posts">
              Posts
            </Link>
            <Link
              className="text-light text-decoration-none ms-4 me-4"
              to="/users"
            >
              Users
            </Link>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Search here..."
            />
            <span className="input-group-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </form>
        <div className="navbar-nav ml-auto">
          <a href="#" className="nav-item nav-link active">
            <i className="fa fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#" className="nav-item nav-link">
            <i className="fa fa-gears"></i>
            <span>Projects</span>
          </a>
          <a href="#" className="nav-item nav-link">
            <i className="fa fa-users"></i>
            <span>Team</span>
          </a>
          <a href="#" className="nav-item nav-link">
            <i className="fa fa-pie-chart"></i>
            <span>Reports</span>
          </a>
          <a href="#" className="nav-item nav-link">
            <i className="fa fa-briefcase"></i>
            <span>Careers</span>
          </a>
          <a href="#" className="nav-item nav-link">
            <i className="fa fa-envelope"></i>
            <span>Messages</span>
          </a>
          <a href="#" className="nav-item nav-link">
            <i className="fa fa-bell"></i>
            <span>Notifications</span>
          </a>
          <div class="circle">
            <p class="circle-inner">
              {user.first_name.at(0) + user.last_name.at(0)}
            </p>
          </div>
          <ul className="drop shadow list-group">
            <li className="list-group-item">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setToken("");
                  setUser("");
                  navigate();
                }}
              >
                Log out
              </button>
            </li>
            <li className="list-group-item">
              Full name: {user.first_name + " " + user.last_name}
            </li>
          </ul>
          <div className="nav-item dropdown">
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item">
                <i className="fa fa-user-o"></i> Profile
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-calendar-o"></i> Calendar
              </a>
              <a href="#" className="dropdown-item">
                <i className="fa fa-sliders"></i> Settings
              </a>
              <div className="divider dropdown-divider"></div>
              <a href="#" className="dropdown-item">
                <i className="material-icons">&#xE8AC;</i> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
