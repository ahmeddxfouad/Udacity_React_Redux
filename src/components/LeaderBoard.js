import React from 'react';
import { connect } from 'react-redux';
import authedUser from "../reducers/authedUser";

const Leaderboard = (props) => {
    return (
        <div className="tableContainer">
            <table>
                <thead>
                <tr>
                    <th>Users</th>
                    <th>Answered</th>
                    <th>Created</th>
                </tr>
                </thead>
                <tbody>
                {props.leaderboardData.map((user) => (
                    <tr key={user.id}>
                        <td>
                            {user.avatarURL && <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar"/>}
                            <h4>{user.name} </h4>
                            <h6>{user.id}</h6>
                        </td>
                        <td>{user.answered}</td>
                        <td>{user.created}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({ users, questions }) => {
    const leaderboardData = Object.values(users).map(user => ({
        id: user.id,
        name: user.name,
        answered: Object.keys(user.answers).length,
        created: user.questions.length
    })).sort((a, b) => (b.answered + b.created) - (a.answered + a.created));

    return {
        leaderboardData
    };
};

export default connect(mapStateToProps)(Leaderboard);
