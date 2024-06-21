import { useState } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

const Login = ({dispatch, users }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleUsername = (e) => {
        const text = e.target.value;
        setUsername(text);
    };

    const handlePassword = (e) => {
        const text = e.target.value;
        setPassword(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(users[username] && users[username].password === password){
            console.log("Things Went Well! you're logged in");
            const userId = users[username];
            dispatch(handleInitialData(userId));

        }
        else{
            alert("Wrong Username or Password!")
        }

        setUsername("");
        setPassword("");


    };


    return (
        <div className="center">
            <h3 className="center">Employee Polls</h3>
            <img src="https://cdn4.iconfinder.com/data/icons/hr-recruitment-management/400/SET-04-512.png" alt={`Avatar of `} style={{width: "300px"}}/>
            <h3 className="center">Login</h3>
            <form className="new-question" onSubmit={handleSubmit}>
                <h5 className="center">User</h5>
                <input
                    placeholder="User"
                    value={username}
                    onChange={handleUsername}
                />
                <h5 className="center">Password</h5>
                <input
                    placeholder="Password"
                    value={password}
                    type="password"
                    onChange={handlePassword}
                />
                <button className="btn" type="submit" disabled={username === "" || password === ""}>
                    Submit
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = ({ users }) => {

    return({
    users
    });
};

export default connect(mapStateToProps)(Login);
