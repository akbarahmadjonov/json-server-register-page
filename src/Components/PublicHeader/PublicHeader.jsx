import { Link } from "react-router-dom";
import logo from "../../assets/images/linkedin-logo-png-2051.png";

export const PublicHeader = () => {
  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
      <Link to="/" className="navbar-brand">
        <img  src={logo} alt="" />
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
          <div className="input-group search-box">
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
          <a href="#" className="nav-item nav-link active ms-5">
            <i className="fa fa-home s"></i>
            <span>Home</span>
          </a>
        </div>
        <Link className="login" to="/login">
          Login
        </Link>
        <Link className="register" to="/register">
          Register now
        </Link>
      </div>
    </nav>
  );
};
