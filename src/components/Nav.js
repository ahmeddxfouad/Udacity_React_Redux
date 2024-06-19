import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";

const Nav = (props) => {
  const navigate = useNavigate();
  const {id , name, avatarURL} = props.authedUser;
  const handleLogout = () => {
    props.dispatch(setAuthedUser(null)).then(() => navigate("/login"));
  }
  return (<div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/new">New </Link>
            </li>
          </ul>

          <div className="profile">
            {avatarURL && <img src={avatarURL ? avatarURL : ""} alt={`Avatar of ${props.authedUser}`} className="nav-avatar"/>}
            <span className="username">{name}</span>
            <Link className="logout" onClick={() => handleLogout()}>Logout</Link>
          </div>
        </nav>
      </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    authedUser : user,
  };
};

export default connect(mapStateToProps)(Nav);
